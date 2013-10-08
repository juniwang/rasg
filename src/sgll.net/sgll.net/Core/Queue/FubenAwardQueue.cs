using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    class AwardInfo
    {
        public string TaskId { get; set; }
        public string AwardId { get; set; }
        public string TaskFullName { get; set; }
    }

    public class FubenAwardQueue : AbstractQueue
    {
        internal List<AwardInfo> Awards = new List<AwardInfo>();

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
                if (Awards.Count > 0)
                    return 0;
                return 1;
            }
        }

        public override void Action()
        {
            if (Awards.Count > 0)
            {
                var award = Awards.First();
                if (string.IsNullOrWhiteSpace(award.AwardId))
                    GetAwardPre(award);
                else
                    OpenAward(award);
            }
        }

        private void OpenAward(AwardInfo award)
        {
            var contents = string.Format("id={0}&award_id={1}&status=1", award.TaskId, award.AwardId);
            dynamic resp = Post("/fuben/openAward", contents);
            if (resp != null && resp.errorCode == 0)
            {
                string msg = award.TaskFullName + "领奖成功";
                if (resp.data != null && resp.data.entity != null)
                {
                    msg += ",获得:" + resp.data.entity.name;
                }
                LogWarn(msg);
            }
            else
            {
                LogError(award.TaskFullName + "领奖失败");
            }
            Awards.Remove(award);
            // reload all fubens
            SGLL.Data.FubenData.Fubens = null;
        }

        private void GetAwardPre(AwardInfo award)
        {
            dynamic resp = Post("/fuben/getAward", "id=" + award.TaskId);
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn("获取奖品id成功：" + award.TaskFullName);
                award.AwardId = resp.data.free_award.id;
            }
            else
            {
                LogError("获取奖品id失败:" + award.TaskFullName);
                Awards.Remove(award);
            }
        }
    }
}
