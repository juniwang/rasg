using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public class AdvanceCallArgs : EventArgs
    {
        public string SenderUserName { get; set; }
        public string Url { get; set; }
        public string Parameters { get; set; }
        public int Times { get; set; }
        public int IntervalSec { get; set; }
    }

    public partial class SgllController
    {
        Random random = new Random();
        public event EventHandler<AdvanceCallArgs> OnAdvanceCall;

        public void AdvanceCall(Object sender, AdvanceCallArgs args)
        {
            if (OnAdvanceCall != null)
            {
                SetTimer(random.Next(1, 30000), () => OnAdvanceCall(sender, args));
            }
        }
    }
}
