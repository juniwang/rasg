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
                if (UpCall.Data.Daoju == null || UpCall.Data.Daoju.Items == null || UpCall.Data.Daoju.NeedSync)
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
                    UpCall.Data.Daoju = new MojoMallDaoju
                    {
                        Items = items,
                        LastSyncTime = DateTime.Now,
                        SyncIntervalSec = 900 + random.Next(0, 100),
                    };

                    //player info
                    if (resp.data.player != null)
                    {
                        UpCall.Data.PlayerInfo.EP = resp.data.player.ep;
                        UpCall.Data.PlayerInfo.VM = resp.data.player.vm;
                        UpCall.Data.PlayerInfo.RM = resp.data.player.rm;
                        UpCall.Data.PlayerInfo.Exp = resp.data.player.xp;
                        UpCall.Data.PlayerInfo.LevelExp = resp.data.player.next_xp;
                        UpCall.Data.PlayerInfo.Level = resp.data.player.level;
                        UpCall.Data.PlayerInfo.Energy = resp.data.player.energy;
                        UpCall.Data.PlayerInfo.Stamima = resp.data.player.stamina;
                        UpCall.Data.PlayerInfo.Grain = resp.data.player.grain;
                        UpCall.Data.PlayerInfo.LastSyncTime = DateTime.Now;
                    }

                    UpCall.CallStatusUpdate(this, ChangedType.ForceBoss | ChangedType.Profile);
                }
            }
        }
    }
}
