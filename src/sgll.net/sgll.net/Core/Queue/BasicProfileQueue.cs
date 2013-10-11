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
            dynamic resp = Post("/entity/index", "");
            if (resp != null && resp.errorCode == 0)
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

        private void SyncPlayerInfo()
        {
            dynamic resp = Post("/player/profile", string.Empty);
            if (resp != null && resp.errorCode == 0 && resp.data != null)
            {
                LogInfo("刷新个人资料");
                var new_p = new MojoPlayer
                {
                    Energy = resp.data.energy,
                    EP = resp.data.ep,
                    Exp = resp.data.xp,
                    Grain = resp.data.grain,
                    Level = resp.data.level,
                    LevelExp = resp.data.next_xp,
                    NickName = resp.data.name,
                    Name = SGLL.Data.LoginUser.Username,
                    RM = resp.data.rm,
                    SP = resp.data.sp,
                    Stamima = resp.data.stamina,
                    VM = resp.data.vm,
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(1200),
                };
                SGLL.Data.PlayerInfo = new_p;

                SGLL.CallStatusUpdate(this, new StatusChangedArgs { ChangedData = ChangedType.Profile });
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.BasicProfileQueue; }
        }
    }
}
