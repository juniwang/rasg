﻿using System;
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

        public struct ParaKey
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
            /// <summary>
            /// 关底boss是否自动领奖。要开晋国蛋的设为false。
            /// </summary>
            public static readonly string AutoBossAward = "boss_award";
            /// <summary>
            /// 银币小于该值时需要使用钱箱、钱袋
            /// </summary>
            public static readonly string MoneyAddLine = "moneyaddline";
            /// <summary>
            /// 增加银币的道具:钱箱、钱袋
            /// </summary>
            public static readonly string MoneyAddItem = "moneyadditem";
            /// <summary>
            /// 银币大于该值时购买道具
            /// </summary>
            public static readonly string MoneySubLine = "moneysubline";
            /// <summary>
            /// 银币太多时，购买的物品：钱箱、超级蒋干、超级蒙古马
            /// </summary>
            public static readonly string MoneySubItem = "moneysubitem";
        }

        public struct Display
        {
            public static readonly string ColdDownDisable = "--:--:--";
        }

        public struct Daoju
        {
            public static readonly string TiliBig = "体力大还丹";
        }
    }
}
