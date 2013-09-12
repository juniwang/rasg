using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;

namespace sgll.net.Core
{
    public class SGLLData
    {
        public SGLLData(LoginUser loginUser)
        {
            this.LoginUser = loginUser;
        }

        public LoginUser LoginUser { get; private set; }
        public MojoPlayer PlayerInfo { get; set; }
        public MojoForceTask ForceTasks { get; set; }
        public MojoHuangjinItemList HuangjinTreasure { get; set; }
        public MojoForceInfo ForceProfile { get; set; }
        public MojoForceZhufushiInfo ForceZhufushi { get; set; }
    }
}
