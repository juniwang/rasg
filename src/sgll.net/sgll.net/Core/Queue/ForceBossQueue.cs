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
                    if (battle.AttackFree > 0 && battle.AttackRMCost == 0)
                        return 0;
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
                if (battle.AttackFree > 0 && battle.AttackRMCost == 0)
                {
                    AttackBossFree();
                }
            }
        }

        private void AttackBossFree()
        { }

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
                    MojoForceBossBattle battle = null;
                    //TODO battle info
                    var boss = new MojoForceBoss
                    {
                        IsInChallange = true,
                        LastSyncTime = DateTime.Now,
                        SyncIntervalSec = 1000 + random.Next(0, 60),
                        Battle = battle,
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
