using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public partial class SgllController
    {
        //public IBridge Client { get; private set; }
        public SgllData Data { get; set; }
        public event EventHandler<LogArgs> OnLog;

        public SgllController(SgllData data)
        {
            //Client = bridge;
            Data = data;
        }

        public void Close()
        {
            // clean up work
            taskScheduler.Dispose();
        }

        public bool Login()
        {
            //var login = Client.Login(Data.LoginUser);
            //if (login.Item1)
            //{
            //    Log("登录", "成功:" + Data.LoginUser.Username, LogLevel.Warn);
            //    return true;
            //}

            //Log("登录", "[" + Data.LoginUser.Username + "]登录失败:" + login.Item2, LogLevel.Error);
            //return false;
            Log("登录", "成功:" + Data.User.Role, LogLevel.Warn);
            return true;
        }
    }
}
