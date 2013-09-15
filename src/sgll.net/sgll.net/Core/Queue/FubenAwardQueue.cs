using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class FubenAwardQueue : AbstractQueue
    {
        class AwardInfo
        {
            public string AwardId { get; set; }
            public string FubenName { get; set; }
        }

        internal Dictionary<string, string> AwardsPre = new Dictionary<string, string>();
        Dictionary<string, AwardInfo> Awards = new Dictionary<string, AwardInfo>();

        public override int QueueGUID
        {
            get
            {
                return SGLLController.QueueGUID.FubenAwardQueue;
            }
        }

        public override int CountDown
        {
            get
            {
                if (AwardsPre.Count > 0 || Awards.Count == 0)
                    return 0;
                return 1;
            }
        }

        public override void Action()
        {
            if (AwardsPre.Count > 0)
            {
                GetAwardPre();
                return;
            }

            if (Awards.Count > 0)
            {
                OpenAward();
            }
        }

        private void OpenAward()
        {
            var task_id = Awards.Keys.First();
            var awardInfo = Awards[task_id];
            var contents = string.Format("id={0}&award_id={1}&status=1", task_id, awardInfo.AwardId);
            var call = UpCall.Client.Post("/fuben/openAward", contents, UpCall.Data.LoginUser.Cookie);
            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    string msg = awardInfo.FubenName + "领奖成功";
                    if (resp.data != null && resp.data.entity != null)
                    {
                        msg += ",获得:" + resp.data.entity.name;
                    }
                    UpCall.LogInfo(this.Title, msg);
                }
                else
                {
                    UpCall.LogDebug(this.Title, call.Item2);
                }
            }
            else
            {
                UpCall.LogInfo(this.Title, call.Item2);
            }
            Awards.Remove(task_id);
        }

        private void GetAwardPre()
        {
            var task_id = AwardsPre.Keys.First();
            var call = UpCall.Client.Post("/fuben/getAward", "id=" + task_id, UpCall.Data.LoginUser.Cookie);
            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    if (Awards.ContainsKey(task_id)) Awards.Remove(task_id);
                    Awards.Add(task_id, new AwardInfo { AwardId = resp.data.free_award.id, FubenName = AwardsPre[task_id] });
                }
                else
                {
                    UpCall.LogDebug(this.Title, call.Item2);
                }
            }
            else
            {
                UpCall.LogInfo(this.Title, call.Item2);
            }
            AwardsPre.Remove(task_id);
        }
    }
}
