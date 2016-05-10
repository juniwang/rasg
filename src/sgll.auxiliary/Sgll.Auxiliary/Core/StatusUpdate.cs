using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    [Flags]
    public enum ChangedType
    {
        None = 0,
        Profile = 0x1,
        ForceTask = 0x2,
        All = 0xffff
    }

    public class StatusChangedArgs : EventArgs
    {
        public ChangedType ChangedData { get; set; }
    }

    public partial class SgllController
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
