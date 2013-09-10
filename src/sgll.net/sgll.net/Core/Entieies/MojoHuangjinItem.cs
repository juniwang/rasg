using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoHuangjinItem
    {
        public string Id { get; set; }
        public int Bought { get; set; }
        /// <summary>
        /// 1=银币 2=元宝
        /// </summary>
        public int MoneyType { get; set; }
        public int Price { get; set; }
        public string EntityId { get; set; }
        public string EntityName { get; set; }
    }

    public class MojoHuangjinItemList
    {
        public DateTime LastSyncTime { get; set; }
        public List<MojoHuangjinItem> Items { get; set; }
        public int ExpireSecond { get; set; }
        /// <summary>
        /// random delay seconds among 5min to half expire to avoid buy in the same time for all account
        /// </summary>
        public int BuyDelay { get; set; }
    }
}
