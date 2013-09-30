using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Queue
{
    public class MoneyMonitorQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.MoneyMonitorQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (Parameters == null)
                    return 1;

                // add money
                if (CanAddMoney())
                {
                    return 0;
                }

                // buy
                return 1;
            }
        }

        private bool CanAddMoney()
        {
            if (Parameters.ContainsKey(SR.ParaKey.MoneyAddLine) && Parameters.ContainsKey(SR.ParaKey.MoneyAddItem))
            {
                int aLine = -1;
                var daoju = Parameters[SR.ParaKey.MoneyAddItem];
                if (int.TryParse(Parameters[SR.ParaKey.MoneyAddLine], out aLine)
                    && Data.PlayerInfo.VM < aLine
                    && HasDaoju(daoju))
                {
                    return true;
                }
            }
            return false;
        }

        public override void Action()
        {
            // add money
            if (CanAddMoney())
            {
                UseEntity(Parameters[SR.ParaKey.MoneyAddItem]);
                SGLL.CallStatusUpdate(this, ChangedType.Profile | ChangedType.MoneyMonitor | ChangedType.Daoju);
            }
        }
    }
}
