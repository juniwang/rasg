using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Queue
{
    public interface IQueue
    {
        /// <summary>
        /// UpCall for callback
        /// </summary>
        SGLLController SGLL { get; set; }

        /// <summary>
        /// If this queue should be delete
        /// </summary>
        bool Enabled { get; set; }

        /// <summary>
        /// Brief information of the task
        /// </summary>
        string Title { get; }

        /// <summary>
        /// Seconds countdown to do the action
        /// </summary>
        int CountDown { get; }

        /// <summary>
        /// Do the action
        /// </summary>
        /// <returns></returns>
        void Action();

        int QueueGUID { get; }

        Dictionary<string, string> Parameters { get; set; }
    }
}
