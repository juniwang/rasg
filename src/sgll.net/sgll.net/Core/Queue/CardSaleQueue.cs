using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;

namespace sgll.net.Core.Queue
{
    public class CardSaleQueue : AbstractQueue
    {
        int filtered = 0;

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.CardSaleQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (SGLL.Data.CardSale == null || SGLL.Data.CardSale.CDFinished)
                {
                    return 0;
                }

                if (SGLL.Data.CardSale.CardsToSell != null && SGLL.Data.CardSale.CardsToSell.Count > 0)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var sale = SGLL.Data.CardSale;
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
            var cards = SGLL.Data.CardSale.CardsToSell.Where(p => p.Name != "蒋干")
                .Where(p => p.Name != "蒙古马")
                .Where(p => p.Name != "龙渊剑")
                .Where(p => p.Name != "超级蒙古马")
                .Where(p => p.Name != "超级蒋干")
                .Where(p => p.RarityId != "1" && p.RarityId != "2");
            if (MatchParam(SR.ParaKey.CardSaleLevel1, "true", true))
            {
                cards = cards.Where(p => p.Level.StartsWith("1/"));
            }
            var ids = string.Join(",", cards.Select(p => p.PlayerEntityId)).Trim(',');
            var names = string.Join(",", cards.Select(p => p.Name)).Trim(',');
            filtered = SGLL.Data.CardSale.CardsToSell.Count - ids.Count();
            if (!string.IsNullOrWhiteSpace(ids))
            {
                /*
                 * {"errorCode":0,"errorMsg":"","data":{"totalPrice":142}}
                 */
                dynamic resp = Post("/entity/sellEntity", "entityIds=" + ids);
                if (resp != null && resp.errorCode == 0)
                {
                    int price = (int)resp.data.totalPrice;
                    SGLL.Data.PlayerInfo.VM += price;
                    LogWarn("卖卡成功，收入银币：" + price + ",卖掉:" + names);

                    if (SGLL.Data.PlayerInfo.CardIndex != null)
                        SGLL.Data.PlayerInfo.CardIndex.CardCount -= cards.Count();
                    SGLL.Data.CardSale.CardsToSell = null;
                    SGLL.CallStatusUpdate(this, ChangedType.Profile);
                }
                else
                {
                    SGLL.Data.CardSale.CardsToSell = null;
                }
            }
        }

        private void QueryCardsToSell()
        {
            string type_ids = SGLL.Data.LoginUser.GetParameter(QueueGUID, SR.ParaKey.CardSaleType, "");
            string rarity_ids = SGLL.Data.LoginUser.GetParameter(QueueGUID, SR.ParaKey.CardSaleRarity, "");
            if (string.IsNullOrWhiteSpace(type_ids) || string.IsNullOrWhiteSpace(rarity_ids))
            {
                LogError("设置错误，无法自动卖卡");
                SGLL.Data.CardSale = new MojoCardSale
                {
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(3600),
                };
                return;
            }
            int count = 50 + filtered;

            string contents = string.Format("type=sale&type_ids={0}&rarity_ids={1}&start=0&count={2}&order_id=2",
                type_ids,
                rarity_ids,
                count);
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
                SGLL.Data.CardSale = new MojoCardSale
                {
                    CardsToSell = toSell,
                    ColdDown = CD(3600),
                    LastSyncTime = DateTime.Now,
                };
                SGLL.Data.PlayerInfo.CardIndex = new MojoCardIndex
                {
                    CardCapacity = resp.data.entityMaxCapacity,
                    CardCount = resp.data.entityCardCount,
                    LastSyncTime = DateTime.Now,
                };
                SGLL.CallStatusUpdate(this, ChangedType.Profile | ChangedType.CardSale);
            }
            else
            {
                SGLL.Data.CardSale = new MojoCardSale
                {
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(3600),
                };
            }
        }
    }
}
