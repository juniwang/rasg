using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Bridge;
using System.Diagnostics;

namespace sgll.net.Core
{
    public partial class SGLLController
    {
        public IBridge Client { get; private set; }
        public SGLLData Data { get; set; }
        public event EventHandler<LogArgs> OnLog;

        public SGLLController(IBridge bridge, SGLLData data)
        {
            Client = bridge;
            Data = data;
        }

        public bool Login()
        {
            var output = new Dictionary<string, string>();
            Client.Login(Data.LoginUser.Username, Data.LoginUser.Password, output);
            if (output.ContainsKey(SR.Keys.Cookie))
            {
                Data.LoginUser.Cookie = output[SR.Keys.Cookie];
                LogInfo("登录", "成功:" + Data.LoginUser.Username);
                return true;
            }

            LogInfo("登录", "失败:" + Data.LoginUser.Username);
            string text = Data.LoginUser.Username + "登录失败";
            if (output.ContainsKey(SR.Keys.Exception))
            {
                text += ":" + output[SR.Keys.Exception];
            }
            if (output.ContainsKey(SR.Keys.StackTrack))
            {
                text += ":" + output[SR.Keys.StackTrack];
            }
            LogDebug(text);
            return false;
        }

        public void LogInfo(string type, string text)
        {
            LogInfo(string.Format("[{0}]{1}", type, text));
        }

        public void LogInfo(string Text)
        {
            TDebugInfo db = new TDebugInfo()
            {
                Level = DebugLevel.Info,
                Text = Text,
            };
            if (this.OnLog != null)
            {
                OnLog(this, new LogArgs() { DebugInfo = db });
            }
        }

        public void LogDebug(string type, string text)
        {
            LogInfo(string.Format("[{0}]{1}", type, text));
        }

        public void LogDebug(string Text)
        {
            StackFrame x = new StackTrace(true).GetFrame(1);
            string MethodName = x.GetMethod().Name;
            string Filename = x.GetFileName();
            int Line = x.GetFileLineNumber();
            TDebugInfo db = new TDebugInfo()
            {
                Filename = Filename,
                Level = DebugLevel.Debug,
                Line = Line,
                MethodName = MethodName,
                Text = Text,
            };

            if (this.OnLog != null)
            {
                OnLog(this, new LogArgs() { DebugInfo = db });
            }
        }

        public void LogError(Exception e)
        {
            StackFrame x = new StackTrace(e).GetFrame(0);
            string MethodName = x.GetMethod().Name;
            string Filename = x.GetFileName();
            int Line = x.GetFileLineNumber();
            TDebugInfo db = new TDebugInfo()
            {
                Filename = Filename,
                Level = DebugLevel.Error,
                Line = Line,
                MethodName = MethodName,
                Text = e.Message + Environment.NewLine + e.StackTrace,
            };
            if (this.OnLog != null)
            {
                OnLog(this, new LogArgs() { DebugInfo = db });
            }
        }
    }
}
