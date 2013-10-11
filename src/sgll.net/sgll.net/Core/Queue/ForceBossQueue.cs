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
                if (SGLL.Data.ForceBoss == null || SGLL.Data.ForceBoss.CDFinished)
                    return 0;

                if (SGLL.Data.ForceBoss.IsInChallange && SGLL.Data.ForceBoss.Battle != null)
                {
                    var battle = SGLL.Data.ForceBoss.Battle;
                    if (battle.AttackFree > 0 && battle.AttackRMCost == 0 && DateTime.Now > battle.LastAttackTime.AddSeconds(battle.AttackTimeout))
                    {
                        if (SGLL.Data.PlayerInfo.SP > 0 || (MatchParam(SR.ParaKey.AutoForceBossSP, "true", true) && HasDaoju(SR.Daoju.TiliBig)))
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
            if (SGLL.Data.ForceBoss == null || SGLL.Data.ForceBoss.CDFinished)
            {
                SyncForceBoss();
                return;
            }

            if (SGLL.Data.ForceBoss.IsInChallange)
            {
                var battle = SGLL.Data.ForceBoss.Battle;
                if (battle.AttackFree > 0 && battle.AttackRMCost == 0 && DateTime.Now > battle.LastAttackTime.AddSeconds(battle.AttackTimeout))
                {
                    if (SGLL.Data.PlayerInfo.SP == 0)
                    {
                        if (MatchParam(SR.ParaKey.AutoForceBossSP, "true", true) && HasDaoju(SR.Daoju.TiliBig))
                        {
                            UseEntity(SR.Daoju.TiliBig);
                            SGLL.CallStatusUpdate(this, ChangedType.ForceBoss | ChangedType.Profile | ChangedType.Daoju);
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
            try
            {
                dynamic resp = Post("/forceBoss/attack", "preview=0&skip_cd=0");
                if (resp != null && resp.errorCode == 0)
                {
                    LogWarn("攻击boss成功");
                    SGLL.Data.ForceBoss.Battle = new MojoForceBossBattle
                    {
                        Left = resp.data.battle.left,
                        BossTimeout = resp.data.battle.timeout,
                        AttackFree = resp.data.battle.attack.free,
                        AttackRMCost = resp.data.battle.attack.cost,
                        AttackTimeout = resp.data.battle.attack.timeout,
                        LastAttackTime = DateTime.Now,
                    };
                    SGLL.Data.ForceBoss.Battle.AttackTimeout += 2;
                    SGLL.Data.ForceBoss.LastSyncTime = DateTime.Now;
                    if (resp.data.player != null)
                    {
                        SGLL.Data.PlayerInfo.SP = resp.data.player.sp;
                        SGLL.Data.PlayerInfo.RM = resp.data.player.rm;
                        SGLL.CallStatusUpdate(this, ChangedType.Profile);
                    }
                }
                else
                {
                    LogWarn((string)resp.errorMsg);
                    if (resp.errorCode == 230403)
                    {
                        SGLL.Data.ForceBoss.Battle.AttackTimeout = 12;
                        SGLL.Data.ForceBoss.Battle.LastAttackTime = DateTime.Now;
                    }
                    else if (resp.errorCode == 10003)
                    {
                        //体力不足
                        SGLL.Data.PlayerInfo.SP = 0;
                    }
                    else
                    {
                        SGLL.Data.ForceBoss = null;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                SGLL.Data.ForceBoss = null;
            }
            SGLL.CallStatusUpdate(this, ChangedType.ForceBoss);
        }

        private void SyncForceBoss()
        {
            dynamic resp = Post("/forceBoss/index", "");
            if (resp != null && resp.errorCode == IN_CHALLENGE_CODE)
            {
                LogWarn("刷新势力boss信息：挑战中");
                //TODO battle info
                var boss = new MojoForceBoss
                {
                    IsInChallange = true,
                    LastSyncTime = DateTime.Now,
                    ColdDown = 60,
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
                SGLL.Data.ForceBoss = boss;
            }
            else
            {
                LogInfo("刷新势力boss信息");
                var boss = new MojoForceBoss
                {
                    IsInChallange = false,
                    LastSyncTime = DateTime.Now,
                    ColdDown = 300,
                    Battle = null,
                };
                SGLL.Data.ForceBoss = boss;
            }
            SGLL.CallStatusUpdate(this, ChangedType.ForceBoss);
        }
    }
}
