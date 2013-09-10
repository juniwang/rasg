using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core
{
    public class LogArgs : EventArgs
    {
        public TDebugInfo DebugInfo { get; set; }
    }

    public class TDebugInfo
    {
        public string MethodName { get; set; }
        public string Filename { get; set; }
        public int Line { get; set; }
        public DebugLevel Level { get; set; }
        public string Text { get; set; }
    }
    public enum DebugLevel
    {
        Debug,
        Info,
        Error,
    }
}
