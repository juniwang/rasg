using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using System.Text.RegularExpressions;

namespace sgll.net.Core.Queue
{
    public class ActivityQueue : AbstractQueue
    {
        ActivityToDo _do;

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ActivityQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (SGLL.Data.ActivityData == null || SGLL.Data.ActivityData.CDFinished || SGLL.Data.ActivityData.Activities == null)
                {
                    return 0;
                }

                if (_do != null)
                {
                    return 0;
                }

                var available = GetAvailableActivity();
                if (available != null)
                {
                    _do = new ActivityToDo
                    {
                        Activity = available,
                        ChosenConditions = new Dictionary<string, string>(),
                    };
                    return 0;
                }

                return 1;
            }
        }

        #region GetAvailableActivity
        private MojoActivityItem GetAvailableActivity()
        {
            foreach (var activity in SGLL.Data.ActivityData.Activities)
            {
                // 未开始或已结束的
                if (activity.HasInvalid || activity.NotStart) continue;
                //等级不足的
                if (activity.NeedPlayerLevel > SGLL.Data.PlayerInfo.Level) continue;
                //变碎为宝
                if (activity.Name == "变碎为宝活动" && (activity.AwardName == "祝福石" || activity.AwardName == "转生丹"))
                {
                    if (CouldDo(activity))
                        return activity;
                }
                // 蒋干/蒙古马自动兑换
                if (MatchConditions(activity, new string[] { "蒋干", "蒙古马", "银币" }))
                {
                    if (CouldDo(activity))
                        return activity;
                }
                // 书银蛋
                if (activity.Name == "每日兑换活动"
                    && Regex.IsMatch(activity.AwardName, "^三星.*将领扭蛋$")
                    && MatchParam(SR.ParaKey.ActivityAutoShu, "true", false))
                {
                    if (CouldDo(activity))
                        return activity;
                }
            }
            return null;
        }

        private bool CouldDo(MojoActivityItem activity)
        {
            if (activity.CouldDo)
            {
                if (activity.IsRepeat && DateTime.Now < activity.LastSyncTime.AddSeconds(activity.ColdDown))
                    return false;
                else if (activity.Conditions.Any(p => p.EntityName.Contains("信物")))
                {
                    // 取消**信物自动兑换
                    return false;
                }
                return true;
            }
            else
            {
                if (activity.HasDo)
                    return false;

                // 如果蒋干和蒙古马不足导致的，可以自动购买
                if (MatchConditions(activity, new string[] { "蒋干", "蒙古马", "银币" })
                    && MatchParam(SR.ParaKey.ActivityAutoJM, "true", false))
                {
                    var m_c = activity.Conditions.Single(p => p.EntityName == "银币");
                    if (!m_c.IsEnough) return false;
                    var jm = activity.Conditions.Where(p => !p.IsEnough && p.EntityName != "银币");
                    return jm.Count() > 0 && SGLL.Data.PlayerInfo.VM >= 1200;
                }

                return false;
            }
        }

        private bool MatchConditions(MojoActivityItem activity, string[] entityNames)
        {
            var targetNames = activity.Conditions.Select(p => p.EntityName).ToList();
            for (int i = 0; i < entityNames.Length; i++)
            {
                if (!targetNames.Contains(entityNames[i]))
                {
                    return false;
                }
                targetNames.Remove(entityNames[i]);
            }
            return targetNames.Count == 0;
        }
        #endregion

        #region private void SyncActivityData()
        private void SyncActivityData()
        {
            dynamic resp = Post("/illustration/list", "type=4");
            if (resp != null && resp.errorCode == 0)
            {
                LogInfo("同步活动信息");
                #region activities
                var activities = new List<MojoActivityItem>();
                foreach (var a in resp.data.list)
                {
                    #region conditions
                    var conditions = new List<MojoActivityItemCondition>();
                    foreach (var c in a.conditions)
                    {
                        var new_c = new MojoActivityItemCondition
                        {
                            Id = c.id,
                            EntityCount = c.entity_count,
                            EntityId = c.entity_id,
                            EntityLevel = c.entity_level,
                            IsEnough = c.is_enough,
                            NeedChoose = c.need_choose,
                            PlayerEntityCount = c.player_entity_count,
                            EntityName = c.entity == null ? "" : c.entity.name
                        };
                        conditions.Add(new_c);
                    }
                    #endregion
                    var new_i = new MojoActivityItem
                    {
                        Id = a.id,
                        Name = a.name,
                        NeedPlayerLevel = a.need_player_level,
                        ColdDown = a.cooling_time,
                        LastSyncTime = DateTime.Now,
                        CouldDo = a.could_do,
                        HasDo = a.has_do,
                        HasInvalid = a.has_invalid,
                        IsRepeat = a.is_repeat,
                        NotStart = a.not_start,
                        Probability = a.probability,
                        Conditions = conditions,
                    };
                    if (a.award != null)
                    {
                        new_i.AwardName = a.award.name;
                        new_i.AwardId = a.award.id;
                    }
                    if (SGLL.Data.ActivityData != null && SGLL.Data.ActivityData.Activities != null)
                    {
                        var exist = SGLL.Data.ActivityData.Activities.FirstOrDefault(p => p.Id == new_i.Id);
                        if (exist != null)
                            new_i.AwardGot = exist.AwardGot;
                    }
                    activities.Add(new_i);
                }
                #endregion
                SGLL.Data.ActivityData = new MojoActivityData
                {
                    Activities = activities,
                    ColdDown = CD(3600),
                    LastSyncTime = DateTime.Now,
                };
                SGLL.CallStatusUpdate(this, ChangedType.Activity);
            }
        }
        #endregion

        #region DoActivity
        private void DoActivity()
        {
            foreach (var cond in _do.Activity.Conditions)
            {
                if (!cond.IsEnough)
                {
                    if ((cond.EntityName == "蒋干" || cond.EntityName == "蒙古马")
                    && MatchParam(SR.ParaKey.ActivityAutoJM, "true", false))
                    {
                        LogInfo("卡片不足，准备购买:" + cond.EntityName);
                        BuyDaoju(cond.EntityName);
                        SGLL.CallStatusUpdate(this, ChangedType.Profile | ChangedType.Activity);
                    }
                    _do = null;
                    SGLL.Data.ActivityData.ColdDown = -3600;
                    return;
                }

                if (cond.NeedChoose && !_do.ChosenConditions.ContainsKey(cond.Id))
                {
                    ChooseCard(cond);
                    return;
                }
            }

            Exchange();
        }

        private void Exchange()
        {
            string contents = "game_activity_id=" + _do.Activity.Id;
            if (_do.ChosenConditions.Count > 0)
            {
                foreach (var key in _do.ChosenConditions.Keys)
                {
                    contents += string.Format("&condition_{0}={1}", key, _do.ChosenConditions[key]);
                }
            }
            dynamic resp = Post("/gameactivity/do", contents);
            if (resp != null && resp.errorCode == 0)
            {
                if (resp.data != null && (bool)resp.data.award_ok)
                {
                    string msg = "兑换[" + _do.Activity.Name + "]成功";
                    if (resp.data.entity != null)
                    {
                        _do.Activity.AwardGot = (string)resp.data.entity.name + "*" + (string)resp.data.entity_count;
                        msg += ",获得：" + _do.Activity.AwardGot;
                    }
                    LogWarn(msg);
                }
                else
                {
                    LogError("兑换失败");
                }
            }
            // refresh the list no matter the result
            SGLL.CallStatusUpdate(this, ChangedType.Activity);
            _do = null;
            SGLL.Data.ActivityData.ColdDown = -3600;
        }

        private void ChooseCard(MojoActivityItemCondition cond)
        {
            dynamic resp = Post("/gameactivity/choose", "start=0&count=1&condition_id=" + cond.Id);
            if (resp != null && resp.errorCode == 0)
            {
                foreach (var item in resp.data.list)
                {
                    if (_do.ChosenConditions.ContainsKey(cond.Id))
                        break;
                    else
                    {
                        string entity_id = (string)resp.data.list[0].player_entity_id;
                        _do.ChosenConditions.Add(cond.Id, entity_id);
                        LogInfo("活动[" + _do.Activity.Name + "]已选择" + cond.EntityName + "一张:" + entity_id);
                    }
                }
                if (!_do.ChosenConditions.ContainsKey(cond.Id))
                {
                    cond.IsEnough = false;
                }
            }
        }
        #endregion

        public override void Action()
        {
            if (SGLL.Data.ActivityData == null || SGLL.Data.ActivityData.CDFinished || SGLL.Data.ActivityData.Activities == null)
            {
                SyncActivityData();
                return;
            }

            if (_do != null)
            {
                DoActivity();
            }
        }

        #region inner class
        class ActivityToDo
        {
            public MojoActivityItem Activity { get; set; }
            public Dictionary<string, string> ChosenConditions { get; set; }
        }
        #endregion
    }
}
