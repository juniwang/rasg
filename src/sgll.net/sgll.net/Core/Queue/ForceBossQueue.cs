using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using sgll.net.Core.Entieies;

namespace sgll.net.Core.Queue
{
    public class ForceBossQueue : AbstractQueue
    {
        private static readonly int PRE_CHALLENGE_CODE = 230001;
        private static readonly int IN_CHALLENGE_CODE = 230002;
        private static readonly int CHALLENGE_FINISH_CODE = 230300;

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ForceBossQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (UpCall.Data.ForceBoss == null || UpCall.Data.ForceBoss.NeedSync)
                    return 0;

                if (UpCall.Data.ForceBoss.IsInChallange && UpCall.Data.ForceBoss.Battle != null)
                {
                    var battle = UpCall.Data.ForceBoss.Battle;
                    if (battle.AttackFree > 0 && battle.AttackRMCost == 0 && DateTime.Now > battle.LastAttackTime.AddSeconds(battle.AttackTimeout))
                    {
                        if (UpCall.Data.PlayerInfo.SP > 0 || (MatchParam(SR.QueueParameterKeys.AutoForceBossSP, "true", true) && HasDaoju(SR.Daoju.TiliBig)))
                        {
                            return 0;
                        }
                        else
                            return 1;
                    }
                }

                return 1;
            }
        }

        public override void Action()
        {
            if (UpCall.Data.ForceBoss == null || UpCall.Data.ForceBoss.NeedSync)
            {
                SyncForceBoss();
                return;
            }

            if (UpCall.Data.ForceBoss.IsInChallange)
            {
                var battle = UpCall.Data.ForceBoss.Battle;
                if (battle.AttackFree > 0 && battle.AttackRMCost == 0 && DateTime.Now > battle.LastAttackTime.AddSeconds(battle.AttackTimeout))
                {
                    if (UpCall.Data.PlayerInfo.SP == 0)
                    {
                        if (MatchParam(SR.QueueParameterKeys.AutoForceBossSP, "true", true) && HasDaoju(SR.Daoju.TiliBig))
                        {
                            UseEntity(SR.Daoju.TiliBig);
                            UpCall.CallStatusUpdate(this, ChangedType.ForceBoss | ChangedType.Profile);
                            return;
                        }
                    }
                    else
                    {
                        AttackBossFree();
                    }
                }
            }
        }

        private void AttackBossFree()
        {
            var call = UpCall.Client.Post("/forceBoss/attack", "preview=0&skip_cd=0", UpCall.Data.LoginUser.Cookie);
            LogDebug(call);
            if (call.IsSuccess())
            {
                try
                {
                    dynamic resp = JObject.Parse(call.Item2);
                    if (resp.errorCode == 0)
                    {
                        LogWarn("攻击boss成功");
                        UpCall.Data.ForceBoss.Battle = new MojoForceBossBattle
                        {
                            Left = resp.data.battle.left,
                            BossTimeout = resp.data.battle.timeout,
                            AttackFree = resp.data.battle.attack.free,
                            AttackRMCost = resp.data.battle.attack.cost,
                            AttackTimeout = resp.data.battle.attack.timeout,
                            LastAttackTime = DateTime.Now,
                        };
                        UpCall.Data.ForceBoss.Battle.AttackTimeout += 2;
                        if (resp.data.player != null)
                        {
                            UpCall.Data.PlayerInfo.SP = resp.data.player.sp;
                            UpCall.Data.PlayerInfo.RM = resp.data.player.rm;
                            UpCall.CallStatusUpdate(this, ChangedType.Profile);
                        }
                    }
                    else
                    {
                        LogWarn(resp.errorMsg);
                        if (resp.errorCode == 230403)
                        {
                            UpCall.Data.ForceBoss.Battle.AttackTimeout = 12;
                            UpCall.Data.ForceBoss.Battle.LastAttackTime = DateTime.Now;
                        }
                        else if (resp.errorCode == 10003)
                        {
                            //体力不足
                            UpCall.Data.PlayerInfo.SP = 0;
                        }
                        else
                        {
                            UpCall.Data.ForceBoss = null;
                        }
                    }
                }
                catch (Exception e)
                {
                    LogError(e);
                    UpCall.Data.ForceBoss = null;
                }
                UpCall.CallStatusUpdate(this, ChangedType.ForceBoss);
            }
        }

        private void SyncForceBoss()
        {
            var call = UpCall.Client.Post("/forceBoss/index", "", UpCall.Data.LoginUser.Cookie);
            LogDebug(call);
            if (call.IsSuccess())
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == IN_CHALLENGE_CODE)
                {
                    LogWarn("刷新势力boss信息：挑战中");
                    //TODO battle info
                    var boss = new MojoForceBoss
                    {
                        IsInChallange = true,
                        LastSyncTime = DateTime.Now,
                        SyncIntervalSec = 1000 + random.Next(0, 60),
                        Battle = new MojoForceBossBattle
                        {
                            Left = resp.data.battle.left,
                            BossTimeout = resp.data.battle.timeout,
                            AttackFree = resp.data.battle.attack.free,
                            AttackRMCost = resp.data.battle.attack.cost,
                            AttackTimeout = resp.data.battle.attack.timeout,
                            LastAttackTime = DateTime.Now,
                        },
                    };
                    UpCall.Data.ForceBoss = boss;
                }
                else
                {
                    LogInfo("刷新势力boss信息");
                    var boss = new MojoForceBoss
                    {
                        IsInChallange = false,
                        LastSyncTime = DateTime.Now,
                        SyncIntervalSec = 300 + random.Next(0, 60),
                        Battle = null,
                    };
                    UpCall.Data.ForceBoss = boss;
                }
                UpCall.CallStatusUpdate(this, ChangedType.ForceBoss);
            }
        }
    }
}
