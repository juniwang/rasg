using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entieies;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public class ForceTaskQueue : AbstractQueue
    {
        private DateTime _nextSystemRefreshTime;

        public override int CountDown
        {
            get
            {
                if (UpCall.Data.ForceTasks == null || UpCall.Data.ForceTasks.Tasks == null)
                {
                    //初始化
                    if (_nextSystemRefreshTime <= DateTime.Now)
                        return 0;
                    return (int)(_nextSystemRefreshTime - DateTime.Now).TotalSeconds;
                }

                //查找可执行内政
                if (GetExecutableTask() != null)
                    return 0;

                //是否有冷却中的内政
                var colddown = UpCall.Data.ForceTasks.Tasks.Where(p => p.Status == 1 && p.ColdDownWithDelay > 0);
                if (colddown.Count() > 0)
                {
                    return colddown.Min(p => p.ColdDownWithDelay);
                }

                //检查是否全部完成
                bool completed = UpCall.Data.ForceTasks.Tasks.All(p => p.UnlockLevel > UpCall.Data.ForceTasks.ForceLevel || p.Status == 2);
                if (completed)
                {
                    //官员刷新
                    if (UpCall.Data.ForceTasks.HasRefresh == 1 && AutoAcceptRefresh())
                    {
                        return 0;
                    }
                }

                //系统刷新
                if (_nextSystemRefreshTime <= DateTime.Now)
                    return 0;
                return (int)(_nextSystemRefreshTime - DateTime.Now).TotalSeconds;
            }
        }

        private bool AutoAcceptRefresh()
        {
            return Parameters != null
                && Parameters.ContainsKey(SR.QueueParameterKeys.AutoAcceptRefresh)
                && Parameters[SR.QueueParameterKeys.AutoAcceptRefresh] == "true";

        }

        private MojoForceTaskItem GetExecutableTask()
        {
            if (UpCall.Data.ForceTasks != null && UpCall.Data.ForceTasks.Tasks != null)
            {
                foreach (var task in UpCall.Data.ForceTasks.Tasks)
                {
                    if (task.UnlockLevel <= UpCall.Data.ForceTasks.ForceLevel)
                    {
                        if (task.LastSyncTime.AddSeconds(task.ColdDownWithDelay) < DateTime.Now)
                        {
                            if (task.Status == 0 || task.Status == 1)
                                return task;
                        }
                    }
                }
            }

            return null;
        }

        public override void Action()
        {
            if (UpCall.Data.ForceTasks == null || UpCall.Data.ForceTasks.Tasks == null)
            {
                DoSystemRefresh();
                _nextSystemRefreshTime = DateTime.Now.AddMinutes(10);
                return;
            }

            //do force task
            var task = GetExecutableTask();
            if (task != null)
            {
                var cookie = UpCall.Data.LoginUser.Cookie;
                var dic = new Dictionary<string, string>();
                try
                {
                    UpCall.Client.AjaxPost("/force/doTask", "id=" + task.Id, cookie, dic);
                    if (dic.ContainsKey(SR.Keys.Response))
                    {
                        dynamic resp = JObject.Parse(dic[SR.Keys.Response]);
                        if (resp.errorCode == 0)
                        {
                            UpCall.LogInfo(this.Title, "执行：" + task.Name);
                            task.Count = resp.data.task.count;
                            task.Status = resp.data.task.status;
                            task.ColdDownSecond = resp.data.task.cold_down;
                            task.LastSyncTime = DateTime.Now;
                            UpCall.CallStatusUpdate(this, ChangedType.ForceTask);

                            var player = resp.data.player;
                            if (player != null)
                            {
                                UpCall.Data.PlayerInfo.VM = player.vm;
                                UpCall.Data.PlayerInfo.Grain = player.grain;
                                UpCall.CallStatusUpdate(this, ChangedType.Profile);
                            }
                        }
                        else if (resp.errorcode == 20002)
                        {
                            //已完成
                            task.Status = 2;
                        }
                        else if (resp.errorCode == 160003)
                        {
                            //卡牌容量不足
                            UpCall.LogInfo(this.Title, "卡牌容量不足");
                            this.Enabled = false;
                        }
                        else if (resp.errorCode == 130019)
                        {
                            //未加入势力
                            UpCall.LogInfo(this.Title, "无法内政：未加入势力");
                            UpCall.Data.ForceTasks.NoForce = true;
                            UpCall.Data.ForceTasks.Tasks = null;
                        }
                        else
                        {
                            //error in memory data. need to re-initialize
                            UpCall.LogDebug(Title, task.Name + "执行出错:" + dic[SR.Keys.Response]);
                            UpCall.Data.ForceTasks.Tasks = null;
                            _nextSystemRefreshTime = DateTime.Now.AddSeconds(5);
                        }
                    }
                }
                catch (Exception e)
                {
                    UpCall.LogError(e);
                    UpCall.Data.ForceTasks.Tasks = null;
                    _nextSystemRefreshTime = DateTime.Now;
                }

                return;
            }

            // accept official refresh
            bool completed = UpCall.Data.ForceTasks.Tasks.All(p => p.UnlockLevel > UpCall.Data.ForceTasks.ForceLevel || p.Status == 2);
            if (completed)
            {
                //官员刷新
                if (UpCall.Data.ForceTasks.HasRefresh == 1 && this.Parameters[SR.QueueParameterKeys.AutoAcceptRefresh] == "true")
                {
                    DoOfficialRefresh();
                }
                else
                {
                    DoSystemRefresh();
                    _nextSystemRefreshTime = DateTime.Now.AddMinutes(10);
                }
            }
        }

        private void DoSystemRefresh()
        {
            var cookie = UpCall.Data.LoginUser.Cookie;
            var dic = new Dictionary<string, string>();
            UpCall.Client.AjaxPost("/force/playerTasks", "", cookie, dic);
            if (dic.ContainsKey(SR.Keys.Response))
            {
                dynamic resp = JObject.Parse(dic[SR.Keys.Response].ToLower());
                if (resp.errorcode == 0)
                {
                    UpCall.LogInfo(Title, "重新加载内政信息");
                    var tasks = new List<MojoForceTaskItem>();
                    foreach (var item in resp.data.task.tasks)
                    {
                        var t = new MojoForceTaskItem
                        {
                            Count = item.count,
                            Id = item.id,
                            LastSyncTime = DateTime.Now,
                            Name = item.name,
                            Status = item.status,
                            SumCount = item.sum_count,
                            UnlockLevel = item.unlock_level,
                            ColdDownSecond = item.cold_down
                        };
                        tasks.Add(t);
                    }
                    var force = new MojoForceTask
                    {
                        ForceLevel = resp.data.task.force_level,
                        HasRefresh = resp.data.has_refresh,
                        NoForce = false,
                        Tasks = tasks,
                    };
                    UpCall.Data.ForceTasks = force;
                }
                else if (resp.errorcode == 130019)
                {
                    //no force
                    UpCall.Data.ForceTasks = new MojoForceTask
                    {
                        NoForce = true
                    };
                }
                UpCall.CallStatusUpdate(this, ChangedType.ForceTask);
            }
        }

        private void DoOfficialRefresh()
        {
            var cookie = UpCall.Data.LoginUser.Cookie;
            var dic = new Dictionary<string, string>();
            UpCall.Client.AjaxPost("/force/acceptRefreshTask", "", cookie, dic);
            if (dic.ContainsKey(SR.Keys.Response))
            {
                dynamic resp = JObject.Parse(dic[SR.Keys.Response].ToLower());
                if (resp.errorcode == 0)
                {
                    UpCall.LogInfo(Title, "自动接受官员刷新");
                    var tasks = new List<MojoForceTaskItem>();
                    foreach (var item in resp.data)
                    {
                        var t = new MojoForceTaskItem
                        {
                            Count = item.count,
                            Id = item.id,
                            LastSyncTime = DateTime.Now,
                            Name = item.name,
                            Status = item.status,
                            SumCount = item.sum_count,
                            UnlockLevel = item.unlock_level,
                            ColdDownSecond = item.cold_down,
                        };
                        tasks.Add(t);
                    }
                    UpCall.Data.ForceTasks.HasRefresh = 0;
                    UpCall.Data.ForceTasks.Tasks = tasks;
                }
                else
                {
                    //重新初始化
                    UpCall.Data.ForceTasks = null;
                }
                UpCall.CallStatusUpdate(this, ChangedType.ForceTask);
            }
        }

        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.ForceTaskQueue; }
        }
    }
}
