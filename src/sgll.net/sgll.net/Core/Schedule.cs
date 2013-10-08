// -----------------------------------------------------------------------
// <copyright file="Schedule.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using sgll.net.Core.Schedule;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public partial class SGLLController
    {
        private ITaskScheduler taskScheduler = new NonBlockingScheduler();

        public void SetTimer(int intervalMs, Action action)
        {
            taskScheduler.Schedule(intervalMs, action);
        }
    }
}
