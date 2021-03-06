﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;
using sgll.net.Core.Entities;

namespace sgll.net.Core.Queue
{
    public class FubenQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.FubenQueue; }
        }

        public override int CountDown
        {
            get
            {
                //初始化副本列表
                if (SGLL.Data.FubenData == null || SGLL.Data.FubenData.Fubens == null || SGLL.Data.FubenData.CDFinished)
                {
                    return 0;
                }

                var fubens = SGLL.Data.FubenData.Fubens;
                foreach (var fuben in fubens)
                {
                    //等级不足，副本锁定中
                    if (fuben.Unlock == 0)
                        continue;

                    if (fuben.Status == 0)
                    {
                        //首次执行副本
                        fuben.CurrentGroup = null;
                        fuben.Groups = null;
                        fuben.Tasks = null;
                        return 0;
                    }
                    else if (fuben.Status == 1)
                    {
                        //副本中
                        //初始化副本
                        if (fuben.Tasks == null || fuben.CurrentGroup == null || fuben.Groups == null)
                            return 0;

                        foreach (var task in fuben.Tasks)
                        {
                            //小关锁定中
                            if (task.Unlock == 0) continue;

                            //有可执行小关
                            if (task.Status == 0) return 0;
                            if (task.Status == 1 && DateTime.Now > task.LastSyncTime.AddSeconds(task.ColdDown)) return 0;
                        }
                    }
                    else if (fuben.Status == 3 && fuben.ColdDown == 0)
                    {
                        //重新闯关
                        fuben.CurrentGroup = null;
                        fuben.Groups = null;
                        fuben.Tasks = null;
                        return 0;
                    }
                    else if (fuben.Status == 2)
                    {
                        // 领奖
                        if (fuben.Tasks == null || fuben.CurrentGroup == null || fuben.Groups == null)
                            return 0;

                        var awardTask = fuben.Tasks.LastOrDefault();
                        if (awardTask != null && awardTask.Status == 3)
                        {
                            string taskFullName = string.Format("[{0}][{1}][{2}]", fuben.Name, fuben.CurrentGroup.Name, awardTask.Name);
                            awardTask.Status = 2;
                            // 小关自动领奖
                            if (fuben.CurrentGroup.Order != fuben.Groups.Count)
                            {
                                OpenAward(fuben, awardTask, taskFullName);
                            }
                            else
                            {
                                //关底boss是否领奖
                                if (MatchParam(SR.ParaKey.AutoBossAward, "true", false))
                                {
                                    OpenAward(fuben, awardTask, taskFullName);
                                }
                            }
                        }
                    }
                }

                return 1;
            }
        }

        public override void Action()
        {
            if (SGLL.Data.FubenData == null || SGLL.Data.FubenData.Fubens == null || SGLL.Data.FubenData.CDFinished)
            {
                RefreshFubenList();
                return;
            }

            foreach (var fb in SGLL.Data.FubenData.Fubens)
            {
                if (fb.Unlock == 0) continue;
                if (fb.Status == 0)
                {
                    ResetFuben(fb);
                    return;
                }
                else if (fb.Status == 1)
                {
                    if (fb.Tasks == null || fb.Groups == null || fb.CurrentGroup == null)
                    {
                        RefreshTasks(fb);
                        return;
                    }
                    MojoFubenTask taskToDo = null;
                    foreach (var task in fb.Tasks)
                    {
                        if (task.Unlock == 0) continue;
                        if (task.Status == 0) { taskToDo = task; break; }
                        else if (task.Status == 1 && DateTime.Now > task.LastSyncTime.AddSeconds(task.ColdDown)) { taskToDo = task; break; }
                    }
                    if (taskToDo != null)
                    {
                        DoTask(fb, taskToDo);
                        return;
                    }
                    else
                    {
                        continue;
                    }
                }
                else if (fb.Status == 3 && fb.ColdDown == 0)
                {
                    ResetFuben(fb);
                    return;
                }
                else if (fb.Status == 2)
                {
                    if (fb.Tasks == null || fb.Groups == null || fb.CurrentGroup == null)
                    {
                        RefreshTasks(fb);
                        return;
                    }
                }
            }
        }

        #region private void DoTask(MojoFuben fuben, MojoFubenTask task)
        private void DoTask(MojoFuben fuben, MojoFubenTask task)
        {
            string taskFullName = string.Format("[{0}][{1}][{2}]", fuben.Name, fuben.CurrentGroup.Name, task.Name);
            dynamic resp = Post("/fuben/do", "id=" + task.Id);
            if (resp != null && resp.errorCode == 0)
            {
                //物品奖励
                string msg = taskFullName + "执行成功";
                if (resp.data.award != null && resp.data.award.bonus != null && resp.data.award.bonus.entities != null)
                {
                    msg = msg + "，获得:" + resp.data.award.bonus.entities[0].name;
                }
                LogWarn(msg);

                //更新task
                task.ColdDown = resp.data.fb_task.cold_down;
                task.Status = resp.data.fb_task.status;
                task.Count = resp.data.fb_task.count;
                task.LastSyncTime = DateTime.Now;

                //领奖
                if (task.Status == 3)
                {
                    //小关自动领奖
                    if (fuben.CurrentGroup.Order != fuben.Groups.Count)
                    {
                        OpenAward(fuben, task, taskFullName);
                    }
                    else
                    {
                        //关底boss是否领奖
                        if (MatchParam(SR.ParaKey.AutoBossAward, "true", false))
                        {
                            OpenAward(fuben, task, taskFullName);
                        }
                    }
                    //解锁下一关
                    if (fuben.CurrentGroup.Order == fuben.Groups.Count) { fuben.Status = 2; }
                    else { fuben.Tasks = null; fuben.CurrentGroup = null; fuben.Groups = null; }
                }
                else if (task.Status == 2)
                {
                    //fuben.Tasks = null; fuben.CurrentGroup = null; fuben.Groups = null;
                    //unlock关底boss
                    bool _unlock = true;
                    for (int i = 0; i < fuben.Tasks.Count - 1; i++)
                    {
                        if (fuben.Tasks[i].Status != 2)
                        {
                            _unlock = false;
                            break;
                        }
                    }
                    if (_unlock)
                    {
                        fuben.Tasks[4].Unlock = 1;
                        fuben.Tasks[4].Status = 1;
                    }
                }
                SGLL.CallStatusUpdate(this, ChangedType.Fuben);

                //更新用户
                if (resp.data.player != null)
                {
                    try
                    {
                        SGLL.Data.PlayerInfo.EP = resp.data.player.ep;
                        SGLL.Data.PlayerInfo.SP = resp.data.player.sp;
                        SGLL.Data.PlayerInfo.VM = resp.data.player.vm;
                        SGLL.Data.PlayerInfo.RM = resp.data.player.rm;
                        SGLL.Data.PlayerInfo.Exp = resp.data.player.xp;
                        SGLL.Data.PlayerInfo.Level = resp.data.player.level;
                        SGLL.Data.PlayerInfo.Energy = resp.data.player.energy;
                        SGLL.Data.PlayerInfo.Stamima = resp.data.player.stamina;
                        SGLL.Data.PlayerInfo.Grain = resp.data.player.grain;
                        SGLL.CallStatusUpdate(this, ChangedType.Profile);
                    }
                    catch (Exception eee)
                    {
                        LogError(eee);
                    }
                }
            }
            else if (resp.errorCode == 160003)
            {
                LogError(taskFullName + "失败：卡牌容量不足");
                var queue = SGLL.QueryQueue(SGLLController.QueueGUID.FubenQueue);
                if (queue != null) queue.Enabled = false;
            }
            else
            {
                LogError(taskFullName + "失败:(" + resp.errorCode + ")" + resp.errorMsg);
                fuben.CurrentGroup = null;
                fuben.Groups = null;
                fuben.Tasks = null;
            }
        }
        #endregion

        private void OpenAward(MojoFuben fuben, MojoFubenTask task, string taskFullName)
        {
            var queue = SGLL.QueryQueue(SGLLController.QueueGUID.FubenAwardQueue) as FubenAwardQueue;
            if (queue != null)
            {
                queue.Awards.Add(new AwardInfo
                {
                    TaskId = task.Id,
                    TaskFullName = taskFullName,
                    FubenId = fuben.Id,
                });
            }
        }

        #region private void RefreshTasks(MojoFuben fuben)
        private void RefreshTasks(MojoFuben fuben)
        {
            dynamic resp=Post("/fuben/fbTasks", "fuben_id=" + fuben.Id);
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn(fuben.Name + "获取副本关卡列表");
                var groups = new List<MojoFubenGroup>();
                foreach (var g in resp.data.fb_task_groups)
                {
                    var new_g = new MojoFubenGroup
                    {
                        Order = g.order,
                        GroupId = g.fb_task_group_id,
                        Name = g.name,
                        Unlock = g.unlock,
                    };
                    groups.Add(new_g);

                    if (new_g.GroupId == (string)resp.data.cur_fb_task_group.fb_task_group_id)
                    {
                        fuben.CurrentGroup = new_g;
                    }
                }
                fuben.Groups = groups;

                var tasks = new List<MojoFubenTask>();
                foreach (var t in resp.data.fb_tasks)
                {
                    var new_t = new MojoFubenTask
                    {
                        ColdDown = t.cold_down,
                        LastSyncTime = DateTime.Now,
                        Status = t.status,
                        Unlock = t.unlock,
                        Count = t.count,
                        Id = t.id,
                        Name = t.name,
                        Order = t.order,
                        SumCount = t.sum_count,
                    };
                    new_t.ColdDown = new_t.ColdDown + 5;
                    tasks.Add(new_t);
                }
                fuben.Tasks = tasks;
                SGLL.CallStatusUpdate(this, ChangedType.Fuben);
            }
        }
        #endregion

        #region ResetFuben
        private void ResetFuben(MojoFuben fuben)
        {
            var contents = string.Format("fuben_id={0}&fuben_refresh=1", fuben.Id);
            dynamic resp = Post("/fuben/fbTasks", contents);
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn(fuben.Name + "重置成功");
                fuben.Status = 1;
                fuben.Award = "";
                SGLL.CallStatusUpdate(this, ChangedType.Fuben);
            }
        }
        #endregion

        #region private void RefreshFubenList()
        private void RefreshFubenList()
        {
            dynamic resp = Post("/fuben/fubens", "");
            if (resp != null && resp.errorCode == 0)
            {
                LogInfo("获取副本信息");
                var fubens = new List<MojoFuben>();
                foreach (var fuben in resp.data)
                {
                    var fd = new MojoFuben
                    {
                        ColdDown = fuben.cold_down,
                        Id = fuben.id,
                        Name = fuben.name,
                        Status = fuben.status,
                        Unlock = fuben.unlock,
                        UnlockLevel = fuben.unlock_level,
                        LastSyncTime = DateTime.Now,
                    };
                    if (SGLL.Data.FubenData != null && SGLL.Data.FubenData.Fubens != null)
                    {
                        var existedFb = SGLL.Data.FubenData.Fubens.FirstOrDefault(p => p.Id == fd.Id);
                        if (existedFb != null)
                            fd.Award = existedFb.Award;
                    }
                    fubens.Add(fd);
                }
                SGLL.Data.FubenData = new MojoFubenData
                {
                    Fubens = fubens,
                    LastSyncTime = DateTime.Now,
                    ColdDown = CD(3600),
                };
                SGLL.CallStatusUpdate(this, ChangedType.Fuben);
            }
        }
        #endregion
    }
}
