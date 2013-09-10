using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Queue
{
    public abstract class AbstractQueue : IQueue
    {
        public SGLLController UpCall
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Title
        {
            get { return SGLLController.QueueTitles[QueueGUID]; }
        }

        public abstract int QueueGUID { get; }
        public abstract int CountDown { get; }
        public abstract void Action();

        public Dictionary<string, string> Parameters
        {
            get;
            set;
        }
    }
}
