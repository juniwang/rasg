using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Queue
{
    public class ForceBossQueue : AbstractQueue
    {
        private static readonly int PRE_CHALLENGE_CODE = 230001;
        private static readonly int IN_CHALLENGE_CODE = 230002;
        private static readonly int CHALLENGE_FINISH_CODE = 230300;

        public override int QueueGUID
        {
            get { throw new NotImplementedException(); }
        }

        public override int CountDown
        {
            get { throw new NotImplementedException(); }
        }

        public override void Action()
        {
            throw new NotImplementedException();
        }
    }
}
