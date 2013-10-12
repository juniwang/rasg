using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;
using sgll.net.Core.Entities;

namespace sgll.net.Core.Queue
{
    public class ForceProfileQueue : AbstractQueue
    {
        DateTime _nextSyncTime = DateTime.Now;
        int syncIntervalSec = 603;
        int syncIntervalSecNoForce = 60 * 60 + 3;

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ForceProfileQueue; }
        }

        public override int CountDown
        {
            get
            {
                return (DateTime.Now > _nextSyncTime) ? 0 : (int)(_nextSyncTime - DateTime.Now).TotalSeconds;
            }
        }

        public override void Action()
        {
            dynamic profile = Post("/force/index", string.Empty);

            if (profile != null && profile.errorCode == 0 && profile.data != null)
            {
                LogInfo("刷新势力信息");
                _nextSyncTime = DateTime.Now.AddSeconds(syncIntervalSec);
                var fi = profile.data.force_info;
                var local = new MojoForceInfo
                {
                    Id = fi.id,
                    Name = fi.name,
                    Announcement = fi.announcement,
                    Challenge = fi.challenge,
                    ChallengeLimit = fi.challenge_limit,
                    first_class_officer_num = fi.first_class_officer_num,
                    first_class_officer_num_limit = fi.first_class_officer_num_limit,
                    Grain = fi.grain,
                    GrainProtected = fi.grain_protected,
                    Level = fi.level,
                    MemberNum = fi.member_num,
                    MemberNumLimit = fi.member_num_limit,
                    OwnerName = fi.owner == null ? "" : fi.owner.name,
                    ViceOwnerName = fi.vice_owner == null ? "" : fi.vice_owner.name,
                    second_class_officer_num = fi.second_class_officer_num,
                    second_class_officer_num_limit = fi.second_class_officer_num_limit,
                    third_class_officer_num = fi.third_class_officer_num,
                    third_class_officer_num_limit = fi.third_class_officer_num_limit,
                };
                SGLL.Data.ForceProfile = local;
                SGLL.CallStatusUpdate(this, new StatusChangedArgs { ChangedData = ChangedType.ForceProfile });
            }
            else
            {
                _nextSyncTime = DateTime.Now.AddSeconds(syncIntervalSecNoForce);
            }
        }
    }
}
