using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entities;

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
        public MojoMallDaoju Daoju { get; set; }
        public MojoForceTask ForceTasks { get; set; }
        public MojoHuangjinItemList HuangjinTreasure { get; set; }
        public MojoForceInfo ForceProfile { get; set; }
        public MojoForceExchangeData ForceExchange { get; set; }
        public MojoCollectData CollectData { get; set; }
        public MojoFubenData FubenData { get; set; }
        public MojoMissionData MissionData { get; set; }
        public MojoForceBoss ForceBoss { get; set; }
        public MojoSigninData SignInData { get; set; }
        public MojoCardSale CardSale { get; set; }
        public MojoActivityData ActivityData { get; set; }
    }
}
