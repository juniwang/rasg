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
                if (CanSubMoney())
                {
                    return 0;
                }

                return 1;
            }
        }

        private bool CanSubMoney()
        {
            if (Parameters.ContainsKey(SR.ParaKey.MoneySubLine) && Parameters.ContainsKey(SR.ParaKey.MoneySubItem))
            {
                int sLine = -1;
                if (int.TryParse(Parameters[SR.ParaKey.MoneySubLine], out sLine)
                    && SGLL.Data.PlayerInfo.VM > sLine)
                {
                    return true;
                }
            }
            return false;
        }

        private bool CanAddMoney()
        {
            if (Parameters.ContainsKey(SR.ParaKey.MoneyAddLine) && Parameters.ContainsKey(SR.ParaKey.MoneyAddItem))
            {
                int aLine = -1;
                var daoju = Parameters[SR.ParaKey.MoneyAddItem];
                if (int.TryParse(Parameters[SR.ParaKey.MoneyAddLine], out aLine)
                    && SGLL.Data.PlayerInfo.VM < aLine
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
                return;
            }

            if (CanSubMoney())
            {
                string dj=Parameters[SR.ParaKey.MoneySubItem];
                BuyDaoju(dj);
                if (SGLL.Data.Daoju.Get(dj) != null)
                    SGLL.Data.Daoju.Get(dj).Count++;
                SGLL.CallStatusUpdate(this, ChangedType.Profile | ChangedType.MoneyMonitor | ChangedType.Daoju);
            }
        }
    }
}
