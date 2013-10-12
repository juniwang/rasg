using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entities;
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
                if (SGLL.Data.CollectData == null || SGLL.Data.CollectData.Items == null || SGLL.Data.CollectData.CDFinished)
                    return 0;

                foreach (var item in SGLL.Data.CollectData.Items)
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
                }

                return 1;
            }
        }

        public override void Action()
        {
            if (SGLL.Data.CollectData == null || SGLL.Data.CollectData.Items == null || SGLL.Data.CollectData.CDFinished)
            {
                RefreshCollectData();
                return;
            }

            foreach (var item in SGLL.Data.CollectData.Items)
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
            }
        }

        #region 收宝
        private void Collect(MojoCollectItem item)
        {
            dynamic resp = Post("/collect/composite", "id=" + item.Id);
            if (resp != null && resp.errorCode == 0)
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
                SGLL.CallStatusUpdate(this, ChangedType.Collect);
            }
            else
            {
                //reset item to refresh
                item.AwayTime = 0;
                item.Fragments = null;
                item.LastSyncTime = DateTime.Now.AddMinutes(-30);
            }
        }
        #endregion

        #region 合成
        private void CollectStart(MojoCollectItem item)
        {
            dynamic resp = Post("/collect/compositestart", "id=" + item.Id);
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn("开始合成：" + item.Name);
                item.LastSyncTime = DateTime.Now;
                item.AwayTime = 3600;
                SGLL.CallStatusUpdate(this, ChangedType.Collect);
            }
            else
            {
                //reset item to refresh
                item.AwayTime = 0;
                item.Fragments = null;
                item.LastSyncTime = DateTime.Now.AddMinutes(-30);
            }
        }
        #endregion

        #region 刷新碎片
        private void RefreshCollectData()
        {
            dynamic resp = Post("/collect", "start=0&count=10&msgid=");
            if (resp != null && resp.errorCode == 0)
            {
                LogInfo("刷新宝物碎片信息");
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

                SGLL.Data.CollectData = new MojoCollectData
                {
                    Items = items,
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(600),
                };
                SGLL.CallStatusUpdate(this, ChangedType.Collect);
            }
        }
        #endregion
    }
}
