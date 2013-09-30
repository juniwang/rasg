using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace sgll.net.Core
{
    public partial class SGLLController
    {
        public void Log(string type, string message, LogLevel level)
        {
            string msg = message;
            if (!string.IsNullOrWhiteSpace(type)) msg = string.Format("[{0}]{1}", type, message);
            if (level == LogLevel.Debug)
            {
                StackFrame x = new StackTrace(true).GetFrame(1);
                string MethodName = x.GetMethod().Name;
                string Filename = x.GetFileName();
                int Line = x.GetFileLineNumber();

                msg = string.Format("[{0,-3}]{1,-12}:{2,-4} {3}",
                               MethodName,
                               Filename,
                               Line,
                               msg);
            }

            TDebugInfo db = new TDebugInfo()
            {
                Level = level,
                Text = msg,
            };

            if (this.OnLog != null)
            {
                OnLog(this, new LogArgs() { DebugInfo = db });
            }
        }

        public void LogError(string type, string message, Exception e)
        {
            if (e != null)
            {
                message = message + ":" + e.Message + Environment.NewLine + e.StackTrace;
            }
            
            Log(type, message, LogLevel.Error);
        }
    }
}
