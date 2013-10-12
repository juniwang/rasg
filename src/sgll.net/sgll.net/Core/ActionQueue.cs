using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Queue;
using sgll.net.Core.Entities;
using sgll.net.Core.Data;

namespace sgll.net.Core
{
    public partial class SGLLController
    {
        // never change those ID and corresponding titles, show names because of compatibility
        public struct QueueGUID
        {
            public static readonly int BasicProfileQueue = 0;
            public static readonly int ForceTaskQueue = 1;
            public static readonly int HuangjinTreasureQueue = 2;
            public static readonly int ForceProfileQueue = 3;
            public static readonly int ForceExchangeQueue = 4;
            public static readonly int CollectQueue = 5;
            public static readonly int FubenQueue = 6;
            public static readonly int FubenAwardQueue = 7;
            public static readonly int MissionQueue = 8;
            public static readonly int ForceBossQueue = 9;
            public static readonly int DaojuQueue = 10;
            public static readonly int SigninQueue = 11;
            public static readonly int SigninQueryQueue = 12;
            public static readonly int MoneyMonitorQueue = 13;
            public static readonly int CardSaleQueue = 14;
            public static readonly int ActivityQueue = 15;
        }

        public static Dictionary<int, string> QueueTitles = new Dictionary<int, string>();
        public static Dictionary<string, int> QueueShowItems = new Dictionary<string, int>();
        public static Dictionary<string, string> MallItemsToBuy = new Dictionary<string, string>();

        static SGLLController()
        {
            // internal use
            QueueTitles.Add(0, "个人资料");
            QueueTitles.Add(1, "内政");
            QueueTitles.Add(2, "黄巾宝藏");
            QueueTitles.Add(3, "势力资料");
            QueueTitles.Add(4, "势力兑换");
            QueueTitles.Add(5, "收宝");
            QueueTitles.Add(6, "副本");
            QueueTitles.Add(7, "副本领奖");
            QueueTitles.Add(8, "任务");
            QueueTitles.Add(9, "势力Boss");
            QueueTitles.Add(10, "道具");
            QueueTitles.Add(11, "签到");
            QueueTitles.Add(12, "签到");
            QueueTitles.Add(13, "银币管理");
            QueueTitles.Add(14, "卖卡");
            QueueTitles.Add(15, "活动中心");

            // for display
            QueueShowItems.Add("内政", 1);
            QueueShowItems.Add("黄巾宝藏", 2);
            QueueShowItems.Add("势力兑换", 4);
            QueueShowItems.Add("收宝", 5);
            QueueShowItems.Add("副本", 6);
            QueueShowItems.Add("任务", 8);
            QueueShowItems.Add("势力Boss", 9);
            QueueShowItems.Add("签到", 11);
            QueueShowItems.Add("银币管理", 13);
            QueueShowItems.Add("卖卡", 14);
            QueueShowItems.Add("活动中心", 15);

            // mall items to buy
            MallItemsToBuy.Add("超级蒋干", "sp1111");
            MallItemsToBuy.Add("超级蒙古马", "sp2222");
            MallItemsToBuy.Add("蒋干", "sp0105"); // 一大波蒋干来了
            MallItemsToBuy.Add("蒙古马", "sp0107"); // 万马奔腾
        }

        private List<IQueue> Queues = new List<IQueue>();

        public void InitializeQueues()
        {
            Queues.Add(new BasicProfileQueue { SGLL = this, Enabled = true });
            Queues.Add(new ForceProfileQueue { SGLL = this, Enabled = true });
            Queues.Add(new DaojuQueue { SGLL = this, Enabled = true });
            Queues.Add(new FubenAwardQueue { SGLL = this, Enabled = true });
            Queues.Add(new SigninQueryQueue { SGLL = this, Enabled = true });

            Queues.Add(new ForceBossQueue { SGLL = this, Enabled = false });
            Queues.Add(new MoneyMonitorQueue { SGLL = this, Enabled = false });
            Queues.Add(new ForceTaskQueue { SGLL = this, Enabled = false });
            Queues.Add(new CollectQueue { SGLL = this, Enabled = false });
            Queues.Add(new HuangjinTreasureQueue { SGLL = this, Enabled = false });
            Queues.Add(new ForceExchangeQueue { SGLL = this, Enabled = false });
            Queues.Add(new FubenQueue { SGLL = this, Enabled = false });
            Queues.Add(new MissionQueue { SGLL = this, Enabled = false });
            Queues.Add(new SigninQueue { SGLL = this, Enabled = false });
            Queues.Add(new CardSaleQueue { SGLL = this, Enabled = false });
            Queues.Add(new ActivityQueue { SGLL = this, Enabled = false });

            if (Data.LoginUser.Features != null)
            {
                foreach (var feature in this.Data.LoginUser.Features)
                {
                    var queue = GetQueueByGuid(feature.TaskId);
                    if (queue != null)
                    {
                        queue.Enabled = feature.Enabled;
                        queue.Parameters = feature.Parameters;
                    }
                }
            }
        }

        internal IQueue QueryQueue(int Qid)
        {
            return Queues.SingleOrDefault(p => p.QueueGUID == Qid);
        }

        public void SetQueueParameters(int Qid, Dictionary<string, string> parameters)
        {
            var queue = GetQueueByGuid(Qid);
            if (queue != null)
            {
                queue.Parameters = parameters;
                var feature = GetOrCreateFeature(Qid);
                feature.Parameters = parameters;
                AccountsLoader.Save(MainForm.Users);
            }
        }

        public void StartQueue(int Qid)
        {
            var queue = GetQueueByGuid(Qid);
            if (queue != null)
            {
                queue.Enabled = true;
                var feature = GetOrCreateFeature(Qid);
                feature.Enabled = true;
                AccountsLoader.Save(MainForm.Users);
            }

        }

        public void StopQueue(int Qid)
        {
            var queue = GetQueueByGuid(Qid);
            if (queue != null)
            {
                queue.Enabled = false;
                var feature = GetOrCreateFeature(Qid);
                feature.Enabled = false;
                AccountsLoader.Save(MainForm.Users);
            }
        }

        int queueIndex = 0;
        public void ExecuteQueue()
        {
            IQueue queue = null;
            for (int i = queueIndex; i < queueIndex + Queues.Count; i++)
            {
                var q = Queues[i % Queues.Count];
                if (!q.Enabled)
                {
                    continue;
                }
                if (q.CountDown <= 0)
                {
                    queue = q;
                    break;
                }
            }
            queueIndex++;
            if (queueIndex > 10000) queueIndex = queueIndex % Queues.Count;

            if (queue != null)
            {
                try
                {
                    queue.Action();
                }
                catch (Exception e)
                {
                    LogError("系统", "队列执行异常", e);
                }

            }
        }

        private IQueue GetQueueByGuid(int Qid)
        {
            return Queues.SingleOrDefault(p => p.QueueGUID == Qid);
        }

        private SFeature GetOrCreateFeature(int Qid)
        {
            if (this.Data.LoginUser.Features == null)
                this.Data.LoginUser.Features = new List<SFeature>();

            SFeature feature = Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == Qid);
            if (feature == null)
            {
                feature = new SFeature(Qid);
                Data.LoginUser.Features.Add(feature);
            }
            return feature;
        }
    }
}
