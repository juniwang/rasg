using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
            return Parameters[key] == targetValue;
        }

        #region Log methods for queue execution
        protected void LogF(string message)
        {
            if (logFlag++ % 100 == 0)
                LogWarn(message);
            else
                LogInfo(message);
        }

        protected void LogInfo(string message)
        {
            UpCall.Log(this.Title, message, LogLevel.Info);
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
    }

    public static class QueueExtensions
    {
        public static string ToLogString(this Tuple<bool, string> tuple)
        {
            if (tuple == null) return "";
            return "[" + tuple.Item1 + "]:" + tuple.Item2;
        }
    }
}
