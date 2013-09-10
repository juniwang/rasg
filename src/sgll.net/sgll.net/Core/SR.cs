using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core
{
    public class SR
    {
        public struct Keys
        {
            public static readonly string Cookie = "ck";
            public static readonly string StackTrack = "st";
            public static readonly string Exception = "ex";
            public static readonly string Response = "resp";
        }

        public struct QueueParameterKeys
        {
            public static readonly string AutoAcceptRefresh = "auto_accept_refresh";
        }
    }
}
