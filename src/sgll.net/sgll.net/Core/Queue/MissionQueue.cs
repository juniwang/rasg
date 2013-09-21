using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class MissionQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.MissionQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (UpCall.Data.MissionData == null)
                    return 0;

                if (UpCall.Data.PlayerInfo == null)
                    return 1;

                var md = UpCall.Data.MissionData;
                if (md.CurScenario == null || md.CurTaskGroup == null || md.TaskGroups == null || md.Tasks == null)
                    return 0;

                if ((double)UpCall.Data.PlayerInfo.EP / (double)UpCall.Data.PlayerInfo.Energy >= 0.3)
                    return 0;
                return 1;
            }
        }

        public override void Action()
        {
            if (UpCall.Data.MissionData == null)
            {
                GetMissionData();
                return;
            }

            var md = UpCall.Data.MissionData;
            if (md.CurScenario == null || md.CurTaskGroup == null || md.TaskGroups == null || md.Tasks == null)
            {
                GetMissionData();
                return;
            }

            var task = md.Tasks.Where(p => p.Unlock == 1).Where(p => p.Status == 0 || p.Status == 1).FirstOrDefault();
            if (task != null && task.EP <= UpCall.Data.PlayerInfo.EP)
                DoMission(task);
        }

        #region DoMission
        private void DoMission(MojoMissionTask task)
        {
            var call = UpCall.Client.Post("/mission/do", string.Format("id={0}&preview=0", task.Id), UpCall.Data.LoginUser.Cookie);
            LogDebug(call);
            if (call.IsSuccess())
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    string msg = "任务" + task.Name + "执行成功";
                    if (resp.data.award != null && resp.data.award.bonus != null && resp.data.award.bonus.entities != null)
                    {
                        msg += ",获得：";
                        foreach (var en in resp.data.award.bonus.entities)
                        {
                            msg += en.name + ",";
                        }
                    }
                    msg = msg.TrimEnd(',');
                    LogWarn(msg);

                    task.Count = resp.data.task.count;
                    task.Status = resp.data.task.status;
                    UpCall.CallStatusUpdate(this, ChangedType.Mission);

                    var player = resp.data.player;
                    if (player != null && UpCall.Data.PlayerInfo != null)
                    {
                        UpCall.Data.PlayerInfo.EP = player.ep;
                        UpCall.Data.PlayerInfo.SP = player.sp;
                        UpCall.Data.PlayerInfo.VM = player.vm;
                        UpCall.Data.PlayerInfo.RM = player.rm;
                        UpCall.Data.PlayerInfo.Exp = player.xp;
                        UpCall.Data.PlayerInfo.LevelExp = player.next_xp;
                        UpCall.Data.PlayerInfo.Level = player.level;
                        UpCall.Data.PlayerInfo.Energy = player.energy;
                        UpCall.Data.PlayerInfo.Stamima = player.stamina;
                        UpCall.Data.PlayerInfo.Grain = player.grain;

                        UpCall.CallStatusUpdate(this, ChangedType.Profile);
                    }
                }
            }
        } 
        #endregion

        #region GetMissionData
        private void GetMissionData()
        {
            var call = UpCall.Client.Post("/mission", "", UpCall.Data.LoginUser.Cookie);
            LogDebug(call.ToLogString());
            if (call.Item1)
            {
                dynamic resp = JObject.Parse(call.Item2);
                if (resp.errorCode == 0)
                {
                    LogF("刷新任务信息");
                    var scenario = new MojoMissionScenario
                    {
                        Name = resp.data.cur_scenario.name,
                        Order = resp.data.cur_scenario.order,
                        ScenarioId = resp.data.cur_scenario.scenario_id,
                        Unlock = resp.data.cur_scenario.unlock
                    };

                    var groups = new List<MojoMissionTaskGroup>();
                    MojoMissionTaskGroup curGroup = null;
                    foreach (var g in resp.data.task_groups)
                    {
                        var new_g = new MojoMissionTaskGroup
                        {
                            Level = g.level,
                            Name = g.name,
                            Order = g.order,
                            ScenarioId = g.scenario_id,
                            TaskGroupId = g.task_group_id,
                            Unlock = g.unlock
                        };
                        groups.Add(new_g);

                        if (new_g.TaskGroupId == (string)resp.data.cur_task_group.task_group_id)
                        {
                            curGroup = new_g;
                        }
                    }

                    var tasks = new List<MojoMissionTask>();
                    foreach (var t in resp.data.task_groups)
                    {
                        var new_t = new MojoMissionTask
                        {
                            Status = t.status,
                            Unlock = t.unlock,
                            Count = t.count,
                            EP = t.ep,
                            Id = t.id,
                            Level = t.level,
                            Name = t.name,
                            ScenarioId = t.scenario_id,
                            SumCount = t.sum_count,
                            TaskGroupId = t.task_group_id,
                            TaskId = t.task_id
                        };
                        tasks.Add(new_t);
                    }

                    UpCall.Data.MissionData = new MojoMissionData
                    {
                        Tasks = tasks,
                        TaskGroups = groups,
                        CurTaskGroup = curGroup,
                        CurScenario = scenario
                    };
                }
            }
        }
        #endregion
    }
}
