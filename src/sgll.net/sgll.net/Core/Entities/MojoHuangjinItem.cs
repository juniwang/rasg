using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entities
{
    public class MojoHuangjinItem
    {
        public string Id { get; set; }
        public int Bought { get; set; }
        /// <summary>
        /// 1=银币 2=元宝
        /// </summary>
        public int MoneyType { get; set; }
        /// <summary>
        /// 原价
        /// </summary>
        public int Price { get; set; }
        /// <summary>
        /// 折扣 e.g.60 means 60%
        /// </summary>
        public int Discount { get; set; }
        public int PriceWithDiscount
        {
            get {
                return Price * Discount / 100;
            }
        }
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
        public bool NoBox { get; set; }
    }
}
