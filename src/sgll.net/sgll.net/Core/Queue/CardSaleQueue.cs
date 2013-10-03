using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;

namespace sgll.net.Core.Queue
{
    public class CardSaleQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.CardSaleQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (Data.CardSale == null || Data.CardSale.CDFinished)
                {
                    return 0;
                }

                if (Data.CardSale.CardsToSell != null && Data.CardSale.CardsToSell.Count > 0)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var sale = Data.CardSale;
            if (sale == null || sale.CDFinished)
            {
                QueryCardsToSell();
                return;
            }

            if (sale.CardsToSell != null || sale.CardsToSell.Count > 0)
            {
                SellCards();
            }
        }

        private void SellCards()
        {
            var cards = Data.CardSale.CardsToSell.Where(p => p.Name != "蒋干")
                .Where(p => p.Name != "蒙古马")
                .Where(p => p.RarityId != "1" && p.RarityId != "2");
            if (MatchParam(SR.ParaKey.CardSaleLevel1, "true", true))
            {
                cards = cards.Where(p => p.Level.StartsWith("1/"));
            }
            var ids = string.Join(",", cards.Select(p => p.PlayerEntityId)).Trim(',');
            var names = string.Join(",", cards.Select(p => p.Name)).Trim(',');
            if (!string.IsNullOrWhiteSpace(ids))
            {
                /*
                 * {"errorCode":0,"errorMsg":"","data":{"totalPrice":142}}
                 */
                dynamic resp = Post("/entity/sellEntity", "entityIds=" + ids);
                if (resp != null && resp.errorCode == 0)
                {
                    int price = (int)resp.data.totalPrice;
                    Data.PlayerInfo.VM += price;
                    LogWarn("卖卡成功，收入银币：" + price + ",卖掉:" + names);

                    if (Data.PlayerInfo.CardIndex != null)
                        Data.PlayerInfo.CardIndex.CardCount -= cards.Count();
                    Data.CardSale.CardsToSell = null;
                    SGLL.CallStatusUpdate(this, ChangedType.Profile);
                }
                else
                {
                    Data.CardSale.CardsToSell = null;
                }
            }
        }

        private void QueryCardsToSell()
        {
            string type_ids = Data.LoginUser.GetParameter(QueueGUID, SR.ParaKey.CardSaleType, "");
            string rarity_ids = Data.LoginUser.GetParameter(QueueGUID, SR.ParaKey.CardSaleRarity, "");
            if (string.IsNullOrWhiteSpace(type_ids) || string.IsNullOrWhiteSpace(rarity_ids))
            {
                LogError("设置错误，无法自动卖卡");
                Data.CardSale = new MojoCardSale
                {
                    LastSyncTime = DateTime.Now,
                    ColdDown = 3600,
                };
                return;
            }

            string contents = string.Format("type=sale&type_ids={0}&rarity_ids={1}&start=0&count=50&order_id=2", type_ids, rarity_ids);
            dynamic resp = Post("/entity/package", contents);
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn("获取可卖卡片列表");
                var toSell = new List<MojoCardEntity>();
                foreach (var card in resp.data.entityList)
                {
                    var new_c = new MojoCardEntity
                    {
                        Id = card.id,
                        Name = card.name,
                        PlayerEntityId = card.player_entity_id,
                        Level = card.level,
                        RarityId = card.rarity_id,
                    };
                    toSell.Add(new_c);
                }
                Data.CardSale = new MojoCardSale
                {
                    CardsToSell = toSell,
                    ColdDown = 3600,
                    LastSyncTime = DateTime.Now,
                };
                Data.PlayerInfo.CardIndex = new MojoCardIndex
                {
                    CardCapacity = resp.data.entityMaxCapacity,
                    CardCount = resp.data.entityCardCount,
                    LastSyncTime = DateTime.Now,
                };
                SGLL.CallStatusUpdate(this, ChangedType.Profile | ChangedType.CardSale);
            }
            else
            {
                Data.CardSale = new MojoCardSale
                {
                    LastSyncTime = DateTime.Now,
                    ColdDown = 3600,
                };
            }
        }
    }
}
