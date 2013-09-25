﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoForceTask
    {
        public bool NoForce { get; set; }
        public int HasRefresh { get; set; }
        public List<MojoForceTaskItem> Tasks { get; set; }
        public int ForceLevel { get; set; }
    }

    public class MojoForceTaskItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public int SumCount { get; set; }
        public int Status { get; set; }
        public int ColdDownSecond { get; set; }
        public int UnlockLevel { get; set; }

        /// <summary>
        /// in seconds. Delayed seconds on the original cd
        /// </summary>
        public int ColdDownWithDelay
        {
            get
            {
                return ColdDownSecond + 5;
            }
        }
        public string ColdDownText
        {
            get
            {
                int cd = 0;
                DateTime tg = LastSyncTime.AddSeconds(ColdDownWithDelay);
                if (tg < DateTime.Now)
                {
                    cd = 0;
                }
                else
                    cd = (int)(tg - DateTime.Now).TotalSeconds;
                return new TimeSpan(0, 0, cd).ToString();
            }
        }
        public DateTime LastSyncTime { get; set; }
    }
}