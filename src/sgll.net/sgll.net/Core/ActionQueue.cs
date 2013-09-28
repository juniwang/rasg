using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Queue;
using sgll.net.Core.Entieies;
using sgll.net.Core.Data;

namespace sgll.net.Core
{
    public partial class SGLLController
    {
        public struct QueueGUID
        {
            public static readonly int BasicProfileQueue = 0;
            public static readonly int ForceTaskQueue = 1;
            public static readonly int HuangjinTreasureQueue = 2;
            public static readonly int ForceProfileQueue = 3;
            public static readonly int ForceZhufushiQueue = 4;
            public static readonly int CollectQueue = 5;
            public static readonly int FubenQueue = 6;
            public static readonly int FubenAwardQueue = 7;
            public static readonly int MissionQueue = 8;
            public static readonly int ForceBossQueue = 9;
            public static readonly int DaojuQueue = 10;
            public static readonly int SigninQueue = 11;
            public static readonly int SigninQueryQueue = 12;
        }

        public static Dictionary<int, string> QueueTitles = new Dictionary<int, string>();

        static SGLLController()
        {
            QueueTitles.Add(0, "个人资料");
            QueueTitles.Add(1, "内政");
            QueueTitles.Add(2, "黄巾宝藏");
            QueueTitles.Add(3, "势力资料");
            QueueTitles.Add(4, "势力兑换祝福石");
            QueueTitles.Add(5, "收宝");
            QueueTitles.Add(6, "副本");
            QueueTitles.Add(7, "副本领奖");
            QueueTitles.Add(8, "任务");
            QueueTitles.Add(9, "势力Boss");
            QueueTitles.Add(10, "道具");
            QueueTitles.Add(11, "签到");
            QueueTitles.Add(12, "签到");
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
            Queues.Add(new ForceTaskQueue { SGLL = this, Enabled = false });
            Queues.Add(new CollectQueue { SGLL = this, Enabled = false });
            Queues.Add(new HuangjinTreasureQueue { SGLL = this, Enabled = false });
            Queues.Add(new ForceZhufushiQueue { SGLL = this, Enabled = false });
            Queues.Add(new FubenQueue { SGLL = this, Enabled = false });
            Queues.Add(new MissionQueue { SGLL = this, Enabled = false });
            Queues.Add(new SigninQueue { SGLL = this, Enabled = false });

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

        public void ExecuteQueue()
        {
            IQueue queue = null;
            foreach (var q in Queues)
            {
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
