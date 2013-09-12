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
        }

        public static Dictionary<int, string> QueueTitles = new Dictionary<int, string>();

        static SGLLController()
        {
            QueueTitles.Add(0, "个人资料");
            QueueTitles.Add(1, "内政");
            QueueTitles.Add(2, "黄巾宝藏");
            QueueTitles.Add(3, "势力资料");
            QueueTitles.Add(4, "势力兑换祝福石");
        }

        private List<IQueue> Queues = new List<IQueue>();

        public void InitializeQueues()
        {
            Queues.Add(new BasicProfileQueue { UpCall = this, Enabled = true });
            Queues.Add(new ForceProfileQueue { UpCall = this, Enabled = true });
            Queues.Add(new ForceTaskQueue { UpCall = this, Enabled = false });
            Queues.Add(new HuangjinTreasureQueue { UpCall = this, Enabled = false });
            Queues.Add(new ForceZhufushiQueue { UpCall = this, Enabled = false });
            

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
                    LogError(e);
                }

            }
        }

        private IQueue GetQueueByGuid(int Qid)
        {
            foreach (var queue in Queues)
            {
                if (queue.QueueGUID == Qid)
                {
                    return queue;
                }
            }
            return null;
        }

        private SFeature GetOrCreateFeature(int Qid)
        {
            if (this.Data.LoginUser.Features == null)
                this.Data.LoginUser.Features = new List<SFeature>();

            SFeature feature = null;
            foreach (var f in Data.LoginUser.Features)
            {
                if (f.TaskId == Qid)
                {
                    feature = f;
                    break;
                }
            }
            if (feature == null)
            {
                feature = new SFeature(Qid);
                feature.Name = SGLLController.QueueTitles[Qid];
                Data.LoginUser.Features.Add(feature);
            }
            return feature;
        }
    }
}
