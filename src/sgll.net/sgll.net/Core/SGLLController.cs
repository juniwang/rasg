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

        public void Close()
        {
            // clean up work
            taskScheduler.Dispose();
        }

        public bool Login()
        {
            var output = new Dictionary<string, string>();
            Client.Login(Data.LoginUser.Username, Data.LoginUser.Password, output);
            if (output.ContainsKey(SR.Keys.Cookie))
            {
                Data.LoginUser.Cookie = output[SR.Keys.Cookie];
                Log("登录", "成功:" + Data.LoginUser.Username, LogLevel.Warn);
                return true;
            }

            Log("登录", "失败:" + Data.LoginUser.Username, LogLevel.Error);
            string text = Data.LoginUser.Username + "登录失败";
            if (output.ContainsKey(SR.Keys.Exception))
            {
                text += ":" + output[SR.Keys.Exception];
            }
            if (output.ContainsKey(SR.Keys.StackTrack))
            {
                text += ":" + output[SR.Keys.StackTrack];
            }
            Log("登录", text, LogLevel.Debug);
            return false;
        }
    }
}
