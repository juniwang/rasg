using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class HuangjinTreasureQueue : AbstractQueue
    {
        public static readonly string[] toBuy = new string[] { "转生丹", "祝福石", "钱箱" };

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
                    if (UpCall.Data.HuangjinTreasure.LastSyncTime.AddSeconds(UpCall.Data.HuangjinTreasure.BuyDelay) <= DateTime.Now)
                    {
                        if (UpCall.Data.PlayerInfo.VM >= item.PriceWithDiscount)
                        {
                            return item;
                        }
                        //else if (MatchParam(SR.QueueParameterKeys.AutoUseVMBoxForTreasure, "true", false) && UpCall.Data.HuangjinTreasure.NoBox == false)
                        //{
                        //    return item;
                        //}
                    }
                    break;
                }
            }
            return null;
        }

        public override void Action()
        {
            if (UpCall.Data.HuangjinTreasure == null || UpCall.Data.HuangjinTreasure.Items == null)
            {
                RefreshData();
            }
            else
            {
                foreach (var item in UpCall.Data.HuangjinTreasure.Items)
                {
                    if (toBuy.Contains(item.EntityName) && item.Bought == 0)
                    {
                        if (UpCall.Data.PlayerInfo.VM >= item.PriceWithDiscount)
                        {
                            BuyItem(item);
                        }
                        else if (MatchParam(SR.QueueParameterKeys.AutoUseVMBoxForTreasure, "true", false))
                        {
                            //TODO use box
                        }
                    }
                }
            }
        }

        private void BuyItem(MojoHuangjinItem toBuy)
        {
            var buy = UpCall.Client.Post("/mall/exchange", "id=" + toBuy.Id, UpCall.Data.LoginUser.Cookie);
            if (buy.Item1)
            {
                dynamic dyn = JObject.Parse(buy.Item2);
                if (dyn.errorCode == 0)
                {
                    toBuy.Bought = 1;
                    UpCall.LogInfo(Title, "黄巾宝藏购买成功，获得：" + toBuy.EntityName);
                    UpCall.CallStatusUpdate(this, ChangedType.HuangjinTreasure);
                }
                else if (dyn.errorCode == 22005)
                {
                    //重复购买
                    toBuy.Bought = 1;
                    UpCall.LogInfo(Title, "黄巾宝藏购买失败：" + dyn.errorMsg);
                    UpCall.CallStatusUpdate(this, ChangedType.HuangjinTreasure);
                }
                else
                {
                    UpCall.LogInfo(Title, "黄巾宝藏购买失败:(" + dyn.errorCode + ")" + dyn.errorMsg);
                    UpCall.Data.HuangjinTreasure = null;
                }
            }
        }

        private void RefreshData()
        {
            var result = UpCall.Client.Post("/mall/rands", "", UpCall.Data.LoginUser.Cookie);
            if (result.Item1)
            {
                dynamic dyn = JObject.Parse(result.Item2);
                if (dyn.errorCode == 0 && dyn.data != null)
                {
                    UpCall.LogInfo(Title, "获取黄巾宝藏列表");
                    var tis = new List<MojoHuangjinItem>();
                    foreach (var item in dyn.data.list)
                    {
                        if (item.money_type == 1)
                        {
                            tis.Add(new MojoHuangjinItem
                                {
                                    Id = item.id,
                                    Discount = item.discount,
                                    Price = item.price,
                                    Bought = item.bought,
                                    EntityId = item.entities.id,
                                    EntityName = item.entities.name,
                                    MoneyType = item.money_type
                                });
                        }
                    }
                    var treasure = new MojoHuangjinItemList
                    {
                        ExpireSecond = dyn.data.expiretime,
                        Items = tis,
                        LastSyncTime = DateTime.Now,
                        NoBox = false,
                    };
                    treasure.BuyDelay = new Random().Next(300, treasure.ExpireSecond > 700 ? treasure.ExpireSecond / 3 : 350);
                    UpCall.Data.HuangjinTreasure = treasure;
                    UpCall.CallStatusUpdate(this, ChangedType.HuangjinTreasure);
                }
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.HuangjinTreasureQueue; }
        }
    }
}
