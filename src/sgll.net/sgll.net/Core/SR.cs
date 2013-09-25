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
            /// <summary>
            /// 是否自动接受官员刷新
            /// </summary>
            public static readonly string AutoAcceptRefresh = "auto_accept_refresh";
            /// <summary>
            /// 银币不足时，是否自动使用钱袋、钱箱。用于购买黄巾宝藏时
            /// </summary>
            public static readonly string AutoUseVMBoxForTreasure = "auto_use_vmbox";
            /// <summary>
            /// 势力boss，体力不足时自动吃体力丹
            /// </summary>
            public static readonly string AutoForceBossSP = "auto_force_boss_sp";
        }

        public struct Display
        {
            public static readonly string ColdDownDisable = "--:--:--";
        }
    }
}
