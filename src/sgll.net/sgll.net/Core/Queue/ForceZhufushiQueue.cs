using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class ForceZhufushiQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ForceZhufushiQueue; }
        }

        public override int CountDown
        {
            get
            {
                var zhufushi = UpCall.Data.ForceZhufushi;
                if (zhufushi == null)
                    return 0;

                if (DateTime.Now > zhufushi.LastSyncTime.AddSeconds(zhufushi.ColdDown))
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var call = UpCall.Client.Post("/force/exchange", "id=dh0001", UpCall.Data.LoginUser.Cookie);
            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    UpCall.LogInfo(this.Title, "兑换祝福石成功");
                    UpCall.Data.ForceZhufushi = new MojoForceZhufushiInfo
                    {
                        ColdDown = resp.data.cold_down,
                        LastSyncTime = DateTime.Now
                    };
                }
                else
                {
                    UpCall.LogInfo(this.Title, "兑换祝福石失败：" + resp.errorMsg);
                    UpCall.Data.ForceZhufushi = new MojoForceZhufushiInfo
                    {
                        ColdDown = 10000,
                        LastSyncTime = DateTime.Now
                    };
                }
            }
            else
            {
                UpCall.LogInfo(this.Title, "兑换祝福石失败：" + call.Item2);
                UpCall.Data.ForceZhufushi = new MojoForceZhufushiInfo
                {
                    ColdDown = 300,
                    LastSyncTime = DateTime.Now
                };
            }
            UpCall.CallStatusUpdate(this, ChangedType.ForceZhufushi);
        }

    }
}
