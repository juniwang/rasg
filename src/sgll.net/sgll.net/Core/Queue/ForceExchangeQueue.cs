﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entities;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace sgll.net.Core.Queue
{
    public class ForceExchangeQueue : AbstractQueue
    {
        private string Pattern = "碎片扭蛋|女将扭蛋|祝福石";

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ForceExchangeQueue; }
        }

        public override int CountDown
        {
            get
            {
                var exchange = SGLL.Data.ForceExchange;
                if (exchange == null || exchange.Items == null || exchange.CDFinished)
                    return 0;

                foreach (var item in SGLL.Data.ForceExchange.Items)
                {
                    if (DateTime.Now > item.LastSyncTime.AddSeconds(item.ColdDown)
                        && SGLL.Data.PlayerInfo.Grain >= item.Grain
                        && item.IsChecked(SGLL.Data.LoginUser)
                        && !item.Locked)
                        return 0;
                }

                return 1;
            }
        }

        private void RefreshExchangelist()
        {
            dynamic resp = Post("/force/exchangelist", "");
            if (resp.errorCode == 0)
            {
                LogInfo("刷新势力兑换列表");
                var items = new List<MojoForceExchangeItem>();
                foreach (var item in resp.data.list)
                {
                    string name = (string)item.name;
                    //if (Regex.IsMatch(name, Pattern))
                    //{

                    //}
                    var new_i = new MojoForceExchangeItem
                    {
                        ColdDown = item.cold_down,
                        LastSyncTime = DateTime.Now,
                        Grain = item.grain,
                        Id = item.id,
                        Name = name,
                    };
                    if ((int)item.rm > 0 || (int)item.unlock_level > SGLL.Data.ForceProfile.Level)
                        new_i.Locked = true;
                    items.Add(new_i);
                    if (SGLL.Data.ForceExchange != null && SGLL.Data.ForceExchange.Items != null)
                    {
                        var exist = SGLL.Data.ForceExchange.Items.FirstOrDefault(p => p.Name == new_i.Name);
                        if (exist != null)
                            new_i.Award = exist.Award;
                    }
                }
                SGLL.Data.ForceExchange = new MojoForceExchangeData
                {
                    Items = items,
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(1200),
                };
                SGLL.CallStatusUpdate(this, ChangedType.ForceExchange);
            }
        }

        private void Exchange(MojoForceExchangeItem item)
        {
            dynamic resp = Post("/force/exchange", "id=" + item.Id);
            if (resp != null && resp.errorCode == 0)
            {
                string msg = "粮食兑换" + item.Name + "成功";
                string award = "";
                if (resp.data != null && resp.data.entities != null)
                {
                    foreach (var en in resp.data.entities)
                    {
                        award += (string)en.name + ",";
                    }
                }
                award = award.TrimEnd(',');
                if (!string.IsNullOrWhiteSpace(award))
                {
                    item.Award = award;
                    msg += ",获得：" + award;
                }
                LogWarn(msg);
                item.LastSyncTime = DateTime.Now;
                item.ColdDown = resp.data.cold_down;

                if (resp.data.player_force != null)
                {
                    SGLL.Data.PlayerInfo.Grain = resp.data.player_force.grain;
                    SGLL.Data.PlayerInfo.RM = resp.data.player_force.rm;
                }
                SGLL.CallStatusUpdate(this, ChangedType.ForceExchange | ChangedType.Profile);
            }
            else
            {
                SGLL.Data.ForceExchange = null;
            }
        }

        public override void Action()
        {
            var exchange = SGLL.Data.ForceExchange;
            if (exchange == null || exchange.Items == null || exchange.CDFinished)
            {
                RefreshExchangelist();
                return;
            }

            MojoForceExchangeItem target = null;
            foreach (var item in exchange.Items)
            {
                if (DateTime.Now > item.LastSyncTime.AddSeconds(item.ColdDown)
                    && SGLL.Data.PlayerInfo.Grain >= item.Grain
                    && item.IsChecked(SGLL.Data.LoginUser)
                    && !item.Locked)
                {
                    target = item;
                    break;
                }
            }
            if (target != null)
                Exchange(target);
        }
    }
}
