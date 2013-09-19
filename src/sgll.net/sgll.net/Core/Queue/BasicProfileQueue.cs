using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class BasicProfileQueue : AbstractQueue
    {
        DateTime _nextSyncTime = DateTime.Now;

        public override int CountDown
        {
            get
            {
                if (_nextSyncTime <= DateTime.Now)
                    return 0;
                return (int)(_nextSyncTime - DateTime.Now).TotalSeconds;
            }
        }

        public override void Action()
        {
            _nextSyncTime = DateTime.Now.AddMinutes(15).AddSeconds(random.Next(10, 60));
            var resp = UpCall.Client.Post("/player/profile", string.Empty, UpCall.Data.LoginUser.Cookie);
            LogDebug(resp.ToLogString());
            if (resp.Item1)
            {
                dynamic profile = JObject.Parse(resp.Item2);
                if (profile.errorCode == 0 && profile.data != null)
                {
                    LogF("刷新个人资料");
                    if (UpCall.Data.PlayerInfo == null)
                        UpCall.Data.PlayerInfo = new Entieies.MojoPlayer();
                    UpCall.Data.PlayerInfo.Energy = profile.data.energy;
                    UpCall.Data.PlayerInfo.EP = profile.data.ep;
                    UpCall.Data.PlayerInfo.Exp = profile.data.xp;
                    UpCall.Data.PlayerInfo.Grain = profile.data.grain;
                    UpCall.Data.PlayerInfo.Level = profile.data.level;
                    UpCall.Data.PlayerInfo.LevelExp = profile.data.next_xp;
                    UpCall.Data.PlayerInfo.NickName = profile.data.name;
                    UpCall.Data.PlayerInfo.Name = UpCall.Data.LoginUser.Username;
                    UpCall.Data.PlayerInfo.RM = profile.data.rm;
                    UpCall.Data.PlayerInfo.SP = profile.data.sp;
                    UpCall.Data.PlayerInfo.Stamima = profile.data.stamina;
                    UpCall.Data.PlayerInfo.VM = profile.data.vm;

                    UpCall.CallStatusUpdate(this, new StatusChangedArgs { ChangedData = ChangedType.Profile });
                }
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.BasicProfileQueue; }
        }
    }
}
