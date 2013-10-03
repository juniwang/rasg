using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core
{
    [Flags]
    public enum ChangedType
    {
        None = 0,
        Profile = 0x1,
        ForceTask = 0x2,
        HuangjinTreasure = 0x4,
        ForceProfile = 0x8,
        ForceExchange = 0x10,
        Collect = 0x20,
        Fuben = 0x40,
        Mission = 0x80,
        ForceBoss = 0x100,
        SignIn = 0x200,
        Daoju = 0x400,
        MoneyMonitor = 0x800,
        CardSale = 0x1000,
        All = 0xffff
    }

    public class StatusChangedArgs : EventArgs
    {
        public ChangedType ChangedData { get; set; }
    }

    public partial class SGLLController
    {
        public event EventHandler<StatusChangedArgs> StatusUpdate;

        public void CallStatusUpdate(Object sender, StatusChangedArgs e)
        {
            if (StatusUpdate != null)
                StatusUpdate(sender, e);
        }

        public void CallStatusUpdate(Object sender, ChangedType changeType)
        {
            if (StatusUpdate != null)
                StatusUpdate(sender, new StatusChangedArgs { ChangedData = changeType });
        }
    }
}
