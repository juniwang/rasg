// -----------------------------------------------------------------------
// <copyright file="DaojuQueue.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Queue
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using sgll.net.Core.Entieies;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class DaojuQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.DaojuQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (SGLL.Data.Daoju == null || SGLL.Data.Daoju.Items == null || SGLL.Data.Daoju.CDFinished)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            dynamic resp = Post("/entity/props", "");
            if (resp != null)
            {
                if (resp.errorCode == 0)
                {
                    LogInfo("刷新道具信息");
                    var items = new List<MojoMallDaojuItem>();
                    foreach (var d in resp.data.list)
                    {
                        //月卡
                        if (((string)d.id).Contains("month_ticket"))
                        {
                            var new_i = new MojoMallDaojuItem
                            {
                                Id = d.id,
                                Name = d.name,
                                Count = d.player_ticket == null ? 0 : d.player_ticket.days,
                                GoodsId = d.goods == null ? "" : d.goods.id,
                                PlayerEntityId = "",
                            };
                            items.Add(new_i);
                        }
                        else
                        {
                            var new_i = new MojoMallDaojuItem
                            {
                                Id = d.id,
                                Name = d.name,
                                Count = d.count,
                                GoodsId = d.goods_id,
                                PlayerEntityId = d.player_entity_id,
                            };
                            items.Add(new_i);
                        }
                    }
                    SGLL.Data.Daoju = new MojoMallDaoju
                    {
                        Items = items,
                        LastSyncTime = DateTime.Now,
                        ColdDown = 900 + random.Next(0, 100),
                    };

                    //player info
                    if (resp.data.player != null)
                    {
                        SGLL.Data.PlayerInfo.EP = resp.data.player.ep;
                        SGLL.Data.PlayerInfo.VM = resp.data.player.vm;
                        SGLL.Data.PlayerInfo.RM = resp.data.player.rm;
                        SGLL.Data.PlayerInfo.Exp = resp.data.player.xp;
                        SGLL.Data.PlayerInfo.LevelExp = resp.data.player.next_xp;
                        SGLL.Data.PlayerInfo.Level = resp.data.player.level;
                        SGLL.Data.PlayerInfo.Energy = resp.data.player.energy;
                        SGLL.Data.PlayerInfo.Stamima = resp.data.player.stamina;
                        SGLL.Data.PlayerInfo.Grain = resp.data.player.grain;
                        SGLL.Data.PlayerInfo.LastSyncTime = DateTime.Now;
                    }

                    SGLL.CallStatusUpdate(this, ChangedType.ForceBoss | ChangedType.Profile | ChangedType.Daoju);
                }
            }
        }
    }
}
