using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class CollectQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get
            {
                return SGLLController.QueueGUID.CollectQueue;
            }
        }

        public override int CountDown
        {
            get
            {
                //初始化
                if (UpCall.Data.CollectData == null || UpCall.Data.CollectData.Items == null)
                    return 0;

                foreach (var item in UpCall.Data.CollectData.Items)
                {
                    if (item.IsCollecting)
                    {
                        if (DateTime.Now > item.LastSyncTime.AddSeconds(item.AwayTime))
                        {
                            //可以收宝
                            return 0;
                        }
                        else
                            continue;
                    }
                    else if (item.CanStartCollect)
                        //可以开始合成
                        return 0;
                    else if (DateTime.Now > item.LastSyncTime.AddMinutes(10))
                        //刷新碎片
                        return 0;
                }

                return 1;
            }
        }

        public override void Action()
        {
            if (UpCall.Data.CollectData == null || UpCall.Data.CollectData.Items == null)
            {
                RefreshCollectData();
                return;
            }

            foreach (var item in UpCall.Data.CollectData.Items)
            {
                if (item.IsCollecting)
                {
                    if (DateTime.Now > item.LastSyncTime.AddSeconds(item.AwayTime))
                    {
                        //收宝
                        Collect(item);
                        return;
                    }
                    else
                        continue;
                }
                else if (item.CanStartCollect)
                {
                    //开始合成
                    CollectStart(item);
                    return;
                }
                else if (DateTime.Now > item.LastSyncTime.AddMinutes(10))
                {
                    RefreshCollectData();
                    return;
                }
            }
        }

        #region 收宝
        private void Collect(MojoCollectItem item)
        {
            var call = UpCall.Client.Post("/collect/composite", "id=" + item.Id, UpCall.Data.LoginUser.Cookie);
            LogDebug(call.ToLogString());

            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogWarn("收宝成功，获得：" + item.Name);
                    item.Count = item.Count + 1;
                    item.LastSyncTime = DateTime.Now;
                    item.AwayTime = 0;
                    var frags = new List<MojoCollectFragment>();
                    foreach (var fr in resp.data.fragments)
                    {
                        var new_f = new MojoCollectFragment { Id = fr.id, Count = fr.count };
                        frags.Add(new_f);
                    }
                    item.Fragments = frags;
                    UpCall.CallStatusUpdate(this, ChangedType.Collect);
                }
                else
                {
                    //reset item to refresh
                    item.AwayTime = 0;
                    item.Fragments = null;
                    item.LastSyncTime = DateTime.Now.AddMinutes(-30);
                }
            }
        }
        #endregion

        #region 合成
        private void CollectStart(MojoCollectItem item)
        {
            var call = UpCall.Client.Post("/collect/compositestart", "id=" + item.Id, UpCall.Data.LoginUser.Cookie);
            LogDebug(call.ToLogString());

            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogWarn("开始合成：" + item.Name);
                    item.LastSyncTime = DateTime.Now;
                    item.AwayTime = 3600;
                    UpCall.CallStatusUpdate(this, ChangedType.Collect);
                }
                else
                {
                    //reset item to refresh
                    item.AwayTime = 0;
                    item.Fragments = null;
                    item.LastSyncTime = DateTime.Now.AddMinutes(-30);
                }
            }
        }
        #endregion

        #region 刷新碎片
        private void RefreshCollectData()
        {
            var call = UpCall.Client.Post("/collect", "start=0&count=10&msgid=", UpCall.Data.LoginUser.Cookie);
            LogDebug(call.ToLogString());

            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogF("刷新宝物碎片信息");
                    var items = new List<MojoCollectItem>();
                    #region construct items
                    foreach (var en in resp.data.entities)
                    {
                        var fragments = new List<MojoCollectFragment>();
                        #region contruct fragments
                        foreach (var frag in en.fragments)
                        {
                            var new_f = new MojoCollectFragment
                            {
                                Id = frag.id,
                                Count = frag.count,
                                Name = frag.name,
                            };
                            fragments.Add(new_f);
                        }
                        #endregion
                        var new_i = new MojoCollectItem
                        {
                            LastSyncTime = DateTime.Now,
                            Fragments = fragments,
                            Id = en.id,
                            Name = en.name,
                            Count = en.count,
                        };
                        try
                        {
                            var jo = (JObject)en;
                            new_i.AwayTime = jo["away_time"] == null ? 0 : (int)jo["away_time"];
                        }
                        catch (Exception)
                        {
                            new_i.AwayTime = 0;
                        }
                        items.Add(new_i);
                    }
                    #endregion

                    UpCall.Data.CollectData = new MojoCollectData
                    {
                        Items = items,
                    };
                    UpCall.CallStatusUpdate(this, ChangedType.Collect);
                }
            }
        } 
        #endregion
    }
}
