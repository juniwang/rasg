// -----------------------------------------------------------------------
// <copyright file="NonBlockingScheduler.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Sgll.Auxiliary.Core.Schedule
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Timers;

    /// <summary>
    /// a scheduler using System.Timers.
    /// </summary>
    public class NonBlockingScheduler : ITaskScheduler
    {
        private Timer timer = new Timer();
        private Action action;

        public NonBlockingScheduler()
        {
            timer.AutoReset = false;
            timer.Elapsed += ((sender, args) => Run());
        }

        public void Schedule(long intervalMs, Action action)
        {
            this.action = action;
            timer.Interval = intervalMs;
            timer.Start();
        }

        private void Run()
        {
            action();
        }

        public void Dispose()
        {
            timer.Dispose();
        }
    }
}
