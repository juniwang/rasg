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
                if (SGLL.Data.MissionData == null)
                    return 0;

                if (SGLL.Data.PlayerInfo == null)
                    return 1;

                var md = SGLL.Data.MissionData;
                if (md.CurScenario == null || md.CurTaskGroup == null || md.TaskGroups == null || md.Tasks == null)
                    return 0;

                if ((double)SGLL.Data.PlayerInfo.EP / (double)SGLL.Data.PlayerInfo.Energy >= 0.4)
                {
                    var task = md.Tasks.Where(p => p.Unlock == 1).Where(p => p.Status == 0 || p.Status == 1).FirstOrDefault();
                    if (task != null)
                        return 0;
                    else
                    {
                        md.Tasks = null;
                        return 0;
                    }
                }
                return 1;
            }
        }

        public override void Action()
        {
            if (SGLL.Data.MissionData == null)
            {
                GetMissionData();
                return;
            }

            var md = SGLL.Data.MissionData;
            if (md.CurScenario == null || md.CurTaskGroup == null || md.TaskGroups == null || md.Tasks == null)
            {
                GetMissionData();
                return;
            }

            var task = md.Tasks.Where(p => p.Unlock == 1).Where(p => p.Status == 0 || p.Status == 1).FirstOrDefault();
            if (task != null && task.EP <= SGLL.Data.PlayerInfo.EP)
                DoMission(task);
        }

        #region DoMission
        private void DoMission(MojoMissionTask task)
        {
            dynamic resp = Post("/mission/do", string.Format("id={0}&preview=0", task.Id));
            if (resp != null && resp.errorCode == 0)
            {
                string msg = "任务[" + task.Name + "]执行成功";
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
                SGLL.CallStatusUpdate(this, ChangedType.Mission);

                var player = resp.data.player;
                if (player != null && SGLL.Data.PlayerInfo != null)
                {
                    SGLL.Data.PlayerInfo.EP = player.ep;
                    SGLL.Data.PlayerInfo.SP = player.sp;
                    SGLL.Data.PlayerInfo.VM = player.vm;
                    SGLL.Data.PlayerInfo.RM = player.rm;
                    SGLL.Data.PlayerInfo.Exp = player.xp;
                    SGLL.Data.PlayerInfo.LevelExp = player.next_xp;
                    SGLL.Data.PlayerInfo.Level = player.level;
                    SGLL.Data.PlayerInfo.Energy = player.energy;
                    SGLL.Data.PlayerInfo.Stamima = player.stamina;
                    SGLL.Data.PlayerInfo.Grain = player.grain;

                    SGLL.CallStatusUpdate(this, ChangedType.Profile);
                }

                if (task.Status == 2)
                {
                    if (SGLL.Data.MissionData.Tasks.All(p => p.Status == 2))
                    {
                        SGLL.Data.MissionData.Tasks = null;
                    }
                    else
                    {
                        var unlock = true;
                        for (int i = 0; i < SGLL.Data.MissionData.Tasks.Count - 1; i++)
                        {
                            if (SGLL.Data.MissionData.Tasks[i].Status != 2)
                            {
                                unlock = false;
                                break;
                            }
                        }
                        if (unlock)
                        {
                            SGLL.Data.MissionData.Tasks.Last().Unlock = 1;
                            SGLL.Data.MissionData.Tasks.Last().Status = 0;
                        }
                    }
                }
            }
            else
            {
                SGLL.Data.MissionData = null;
                if (resp.errorCode == 20010)
                {
                    LogError((string)resp.errorMsg);
                }
            }
        }
        #endregion

        #region GetMissionData
        private void GetMissionData()
        {
            dynamic resp = Post("/mission", "");
            if (resp != null && resp.errorCode == 0)
            {
                LogInfo("刷新任务信息");
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
                foreach (var t in resp.data.tasks)
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

                SGLL.Data.MissionData = new MojoMissionData
                {
                    Tasks = tasks,
                    TaskGroups = groups,
                    CurTaskGroup = curGroup,
                    CurScenario = scenario
                };
            }
            SGLL.CallStatusUpdate(this, ChangedType.Mission);
        }
        #endregion
    }
}
