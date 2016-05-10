using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public class LogArgs : EventArgs
    {
        public TDebugInfo DebugInfo { get; set; }
    }

    public class TDebugInfo
    {
        public LogLevel Level { get; set; }
        public string Text { get; set; }
    }
    public enum LogLevel
    {
        All = 0,
        Debug = 1,
        Info = 2,
        Warn = 3,
        Error = 4,
    }
}
