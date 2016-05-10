using Sgll.Auxiliary.Core.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public partial class SgllController
    {
        private ITaskScheduler taskScheduler = new NonBlockingScheduler();
        public void SetTimer(int intervalMs, Action action)
        {
            taskScheduler.Schedule(intervalMs, action);
        }
    }
}
