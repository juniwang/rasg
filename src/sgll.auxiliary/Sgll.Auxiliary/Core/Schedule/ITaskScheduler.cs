// -----------------------------------------------------------------------
// <copyright file="ITaskScheduler.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Sgll.Auxiliary.Core.Schedule
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// scheduler to schedule a task action after a certain period of delay.
    /// </summary>
    public interface ITaskScheduler : IDisposable
    {
        /// <summary>
        /// execute action after a certain period of delay.
        /// </summary>
        /// <param name="intervalMs">the delay before the task be executed.</param>
        /// <param name="action">the action.</param>
        void Schedule(long intervalMs, Action action);
    }
}
