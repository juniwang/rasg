using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core
{
    public class AdvanceCallArgs : EventArgs
    {
        public string SenderUserName { get; set; }
        public string Url { get; set; }
        public string Parameters { get; set; }
        public int Times { get; set; }
        public int IntervalSec { get; set; }
    }

    public partial class SGLLController
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
