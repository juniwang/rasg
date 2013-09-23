using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;
using sgll.net.Core.Entieies;

namespace sgll.net.Core.Queue
{
    public class BasicProfileQueue : AbstractQueue
    {
        public override int CountDown
        {
            get
            {
                if (UpCall.Data.PlayerInfo == null || UpCall.Data.PlayerInfo.CardIndex == null)
                    return 0;

                var p = UpCall.Data.PlayerInfo;
                if (p.NeedSync || p.CardIndex.NeedSync)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var p = UpCall.Data.PlayerInfo;
            if (p == null || p.NeedSync)
            {
                SyncPlayerInfo();
                return;
            }
            if (p.CardIndex == null || p.CardIndex.NeedSync)
            {
                SyncCardIndex();
            }
        }

        private void SyncCardIndex()
        {
            /*
             * {"errorCode":0,"errorMsg":"","data":{"entityCardCount":647,"entityMaxCapacity":900}}
             */
            var call = UpCall.Client.Post("/entity/index", "", UpCall.Data.LoginUser.Cookie);
            LogDebug(call);
            if (call.IsSuccess())
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogInfo("刷新卡片数量信息");
                    var new_ci = new MojoCardIndex
                    {
                        CardCount = resp.data.entityCardCount,
                        CardCapacity = resp.data.entityMaxCapacity,
                        LastSyncTime = DateTime.Now,
                    };
                    UpCall.Data.PlayerInfo.CardIndex = new_ci;
                    UpCall.CallStatusUpdate(this, ChangedType.Profile);
                }
            }
        }

        private void SyncPlayerInfo()
        {
            var resp = UpCall.Client.Post("/player/profile", string.Empty, UpCall.Data.LoginUser.Cookie);
            LogDebug(resp.ToLogString());
            if (resp.IsSuccess())
            {
                dynamic profile = JObject.Parse(resp.Item2);
                if (profile.errorCode == 0 && profile.data != null)
                {
                    LogInfo("刷新个人资料");
                    var new_p = new MojoPlayer
                    {
                        Energy = profile.data.energy,
                        EP = profile.data.ep,
                        Exp = profile.data.xp,
                        Grain = profile.data.grain,
                        Level = profile.data.level,
                        LevelExp = profile.data.next_xp,
                        NickName = profile.data.name,
                        Name = UpCall.Data.LoginUser.Username,
                        RM = profile.data.rm,
                        SP = profile.data.sp,
                        Stamima = profile.data.stamina,
                        VM = profile.data.vm,
                        LastSyncTime = DateTime.Now,
                        SyncIntervalSec = 900 + random.Next(0, 60),
                    };
                    UpCall.Data.PlayerInfo = new_p;

                    UpCall.CallStatusUpdate(this, new StatusChangedArgs { ChangedData = ChangedType.Profile });
                }
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.BasicProfileQueue; }
        }
    }
}
