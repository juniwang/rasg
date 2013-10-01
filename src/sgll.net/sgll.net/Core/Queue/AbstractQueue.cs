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

        public SGLLController SGLL
        {
            get;
            set;
        }

        public SGLLData Data
        {
            get
            {
                return SGLL == null ? null : SGLL.Data;
            }
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
            SGLL.Log(this.Title, message, LogLevel.Info);
        }

        protected void LogDebug(Tuple<bool, string> callResult)
        {
            LogDebug(callResult.ToLogString());
        }

        protected void LogDebug(string message)
        {
            SGLL.Log(this.Title, message, LogLevel.Debug);
        }

        /// <summary>
        /// show warning log. will always shown
        /// </summary>
        /// <param name="message"></param>
        protected void LogWarn(string message)
        {
            SGLL.Log(this.Title, message, LogLevel.Warn);
        }

        protected void LogError(string message)
        {
            SGLL.Log(this.Title, message, LogLevel.Error);
        }

        protected void LogError(Exception e)
        {
            SGLL.LogError(this.Title, e.Message, e);
        }

        protected void LogError(string message, Exception e)
        {
            SGLL.LogError(this.Title, message, e);
        }
        #endregion

        #region common methods
        protected bool HasDaoju(string name)
        {
            if (SGLL.Data.Daoju != null)
            {
                var dj = SGLL.Data.Daoju.Get(name);
                if (dj != null && dj.Count > 0)
                    return true;
            }
            return false;
        }

        protected void BuyDaoju(string name)
        {
            var dj = Data.Daoju.Get(name);
            string id = "";
            if (dj != null)
                id = dj.GoodsId;
            else if (SGLLController.MallItemsToBuy.ContainsKey(name))
                id = SGLLController.MallItemsToBuy[name];

            if (!string.IsNullOrWhiteSpace(id))
            {
                dynamic resp = Post("/mall/buy", "id=" + id);
                if (resp != null && resp.errorCode == 0)
                {
                    LogWarn("购买成功，获得：" + name);
                    if (resp.data != null && resp.data.player != null)
                    {
                        SGLL.Data.PlayerInfo.VM = resp.data.player.vm;
                        SGLL.Data.PlayerInfo.RM = resp.data.player.rm;
                    }
                }
            }
        }

        protected void UseEntity(string name)
        {
            /*{"errorCode":0,"errorMsg":"","data":{"player":{"id":"1568875","name":"Ningque10","hp":"0","ep":"64","sp":3,"vm":4501,"rm":"44","xp":"319","next_xp":"768","level":"29","health":"0","energy":"64","stamina":"3","hp_percent":"0","ep_percent":"4","sp_percent":"24","hp_second":-1,"ep_second":-1,"sp_second":-1,"hp_restore_pp":null,"ep_restore_pp":288,"sp_restore_pp":5472,"avoid_war_time":0,"grain":6253},"value":3,"challenge":null,"use_rule":"2"}}*/
            var dj = SGLL.Data.Daoju.Get(name);
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
                        SGLL.Data.PlayerInfo.EP = resp.data.player.ep;
                        SGLL.Data.PlayerInfo.SP = resp.data.player.sp;
                        SGLL.Data.PlayerInfo.VM = resp.data.player.vm;
                        SGLL.Data.PlayerInfo.RM = resp.data.player.rm;
                        SGLL.Data.PlayerInfo.Exp = resp.data.player.xp;
                        SGLL.Data.PlayerInfo.LevelExp = resp.data.player.next_xp;
                        SGLL.Data.PlayerInfo.Level = resp.data.player.level;
                        SGLL.Data.PlayerInfo.Energy = resp.data.player.energy;
                        SGLL.Data.PlayerInfo.Stamima = resp.data.player.stamina;
                        SGLL.Data.PlayerInfo.Grain = resp.data.player.grain;
                        SGLL.Data.PlayerInfo.LastSyncTime = DateTime.Now;
                    }
                }
            }
        }

        protected dynamic Post(string url, string contents)
        {
            var call = SGLL.Client.Post(url, contents, SGLL.Data.LoginUser.Cookie);
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
