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
                var zhufushi = SGLL.Data.ForceZhufushi;
                if (zhufushi == null)
                    return 0;

                if (DateTime.Now > zhufushi.LastSyncTime.AddSeconds(zhufushi.ColdDown))
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            var call = SGLL.Client.Post("/force/exchange", "id=dh0001", SGLL.Data.LoginUser.Cookie);
            LogDebug(call.ToLogString());
            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogWarn("兑换祝福石成功");
                    SGLL.Data.ForceZhufushi = new MojoForceZhufushiInfo
                    {
                        ColdDown = resp.data.cold_down,
                        LastSyncTime = DateTime.Now
                    };
                }
                else
                {
                    LogError("兑换祝福石失败：" + resp.errorMsg);
                    SGLL.Data.ForceZhufushi = new MojoForceZhufushiInfo
                    {
                        ColdDown = 10000 + new Random().Next(0, 2000),
                        LastSyncTime = DateTime.Now
                    };
                }
            }
            else
            {
                LogError("兑换祝福石失败：" + call.Item2);
                SGLL.Data.ForceZhufushi = new MojoForceZhufushiInfo
                {
                    ColdDown = 300,
                    LastSyncTime = DateTime.Now
                };
            }
            SGLL.CallStatusUpdate(this, ChangedType.ForceZhufushi);
        }

    }
}
