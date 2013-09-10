using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;

namespace sgll.net.Core.Queue
{
    public class HuangjinTreasureQueue : AbstractQueue
    {
        private string[] toBuy = new string[] { "转生丹", "祝福石", "钱箱" };
        public override int CountDown
        {
            get
            {
                var treasure = UpCall.Data.HuangjinTreasure;
                if (treasure == null || treasure.Items == null)
                    return 0;

                var ts = treasure.LastSyncTime.AddSeconds(treasure.ExpireSecond);
                if (ts <= DateTime.Now)
                {
                    UpCall.Data.HuangjinTreasure = null;
                    return 0;
                }

                return GetItemToBuy() != null ? 0 : 1;
            }
        }

        private MojoHuangjinItem GetItemToBuy()
        {
            foreach (var item in UpCall.Data.HuangjinTreasure.Items)
            {
                if (toBuy.Contains(item.EntityName) && item.Bought == 0)
                {
                    break;
                }
            }
            return null;
        }

        public override void Action()
        {
            throw new NotImplementedException();
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.HuangjinTreasureQueue; }
        }
    }
}
