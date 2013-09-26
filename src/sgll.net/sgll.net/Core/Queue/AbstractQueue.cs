using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace sgll.net.Core.Queue
{
    public abstract class AbstractQueue : IQueue
    {
        protected static int logFlag = 0;
        protected Random random = new Random();

        public SGLLController UpCall
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Title
        {
            get { return SGLLController.QueueTitles[QueueGUID]; }
        }

        public abstract int QueueGUID { get; }
        public abstract int CountDown { get; }
        public abstract void Action();

        public Dictionary<string, string> Parameters
        {
            get;
            set;
        }

        protected bool MatchParam(string key, string targetValue, bool def)
        {
            if (Parameters == null)
                return def;
            if (!Parameters.Keys.Contains(key))
                return def;
            return Parameters[key].Equals(targetValue, StringComparison.OrdinalIgnoreCase);
        }

        #region Log methods for queue execution
        protected void LogInfo(string message)
        {
            UpCall.Log(this.Title, message, LogLevel.Info);
        }

        protected void LogDebug(Tuple<bool, string> callResult)
        {
            LogDebug(callResult.ToLogString());
        }

        protected void LogDebug(string message)
        {
            UpCall.Log(this.Title, message, LogLevel.Debug);
        }

        /// <summary>
        /// show warning log. will always shown
        /// </summary>
        /// <param name="message"></param>
        protected void LogWarn(string message)
        {
            UpCall.Log(this.Title, message, LogLevel.Warn);
        }

        protected void LogError(string message)
        {
            UpCall.Log(this.Title, message, LogLevel.Error);
        }

        protected void LogError(Exception e)
        {
            UpCall.LogError(this.Title, e.Message, e);
        }

        protected void LogError(string message, Exception e)
        {
            UpCall.LogError(this.Title, message, e);
        }
        #endregion

        #region common methods
        protected bool HasDaoju(string name)
        {
            if (UpCall.Data.Daoju != null)
            {
                var dj = UpCall.Data.Daoju.Get(name);
                if (dj != null && dj.Count > 0)
                    return true;
            }
            return false;
        }

        protected void UseEntity(string name)
        {
            /*{"errorCode":0,"errorMsg":"","data":{"player":{"id":"1568875","name":"Ningque10","hp":"0","ep":"64","sp":3,"vm":4501,"rm":"44","xp":"319","next_xp":"768","level":"29","health":"0","energy":"64","stamina":"3","hp_percent":"0","ep_percent":"4","sp_percent":"24","hp_second":-1,"ep_second":-1,"sp_second":-1,"hp_restore_pp":null,"ep_restore_pp":288,"sp_restore_pp":5472,"avoid_war_time":0,"grain":6253},"value":3,"challenge":null,"use_rule":"2"}}*/
            var dj = UpCall.Data.Daoju.Get(name);
            dynamic resp = Post("/entity/Use", "id=" + dj.PlayerEntityId);
            if (resp != null)
            {
                if (resp.errorCode == 0)
                {
                    LogWarn("使用" + name + "成功");
                    dj.Count--;
                    //player info
                    if (resp.data.player != null)
                    {
                        UpCall.Data.PlayerInfo.EP = resp.data.player.ep;
                        UpCall.Data.PlayerInfo.SP = resp.data.player.sp;
                        UpCall.Data.PlayerInfo.VM = resp.data.player.vm;
                        UpCall.Data.PlayerInfo.RM = resp.data.player.rm;
                        UpCall.Data.PlayerInfo.Exp = resp.data.player.xp;
                        UpCall.Data.PlayerInfo.LevelExp = resp.data.player.next_xp;
                        UpCall.Data.PlayerInfo.Level = resp.data.player.level;
                        UpCall.Data.PlayerInfo.Energy = resp.data.player.energy;
                        UpCall.Data.PlayerInfo.Stamima = resp.data.player.stamina;
                        UpCall.Data.PlayerInfo.Grain = resp.data.player.grain;
                        UpCall.Data.PlayerInfo.LastSyncTime = DateTime.Now;
                    }
                }
            }
        }

        protected dynamic Post(string url, string contents)
        {
            var call = UpCall.Client.Post(url, contents, UpCall.Data.LoginUser.Cookie);
            LogDebug(call);
            if (call.IsSuccess())
                return JObject.Parse(call.Item2);
            return null;
        }
        #endregion
    }

    public static class QueueExtensions
    {
        public static string ToLogString(this Tuple<bool, string> tuple)
        {
            if (tuple == null) return "";
            return "[" + tuple.Item1 + "]:" + tuple.Item2;
        }

        public static bool IsSuccess(this Tuple<bool, string> tuple)
        {
            return tuple.Item1;
        }
    }
}
