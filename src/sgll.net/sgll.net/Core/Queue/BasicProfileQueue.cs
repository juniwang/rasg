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
                if (SGLL.Data.PlayerInfo == null || SGLL.Data.PlayerInfo.CardIndex == null)
                    return 0;

                var p = SGLL.Data.PlayerInfo;
                if (p.CDFinished || p.CardIndex.CDFinished)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var p = SGLL.Data.PlayerInfo;
            if (p == null || p.CDFinished)
            {
                SyncPlayerInfo();
                return;
            }
            if (p.CardIndex == null || p.CardIndex.CDFinished)
            {
                SyncCardIndex();
            }
        }

        private void SyncCardIndex()
        {
            /*
             * {"errorCode":0,"errorMsg":"","data":{"entityCardCount":647,"entityMaxCapacity":900}}
             */
            var call = SGLL.Client.Post("/entity/index", "", SGLL.Data.LoginUser.Cookie);
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
                        ColdDown = CD(3600),
                    };
                    SGLL.Data.PlayerInfo.CardIndex = new_ci;
                    SGLL.CallStatusUpdate(this, ChangedType.Profile);
                }
            }
        }

        private void SyncPlayerInfo()
        {
            var resp = SGLL.Client.Post("/player/profile", string.Empty, SGLL.Data.LoginUser.Cookie);
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
                        Name = SGLL.Data.LoginUser.Username,
                        RM = profile.data.rm,
                        SP = profile.data.sp,
                        Stamima = profile.data.stamina,
                        VM = profile.data.vm,
                        LastSyncTime = DateTime.Now,
                        ColdDown = CD(1200),
                    };
                    SGLL.Data.PlayerInfo = new_p;

                    SGLL.CallStatusUpdate(this, new StatusChangedArgs { ChangedData = ChangedType.Profile });
                }
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.BasicProfileQueue; }
        }
    }
}
