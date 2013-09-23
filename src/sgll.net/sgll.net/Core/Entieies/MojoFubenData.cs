using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace sgll.net.Core.Entieies
{
    public class MojoFubenData
    {
        public List<MojoFuben> Fubens { get; set; }
        public DateTime NextSyncTime { get; set; }
    }

    public class MojoFuben
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int UnlockLevel { get; set; }
        public int ColdDown { get; set; }
        public int Unlock { get; set; }
        public int Status { get; set; }
        public DateTime LastSyncTime { get; set; }
        public MojoFubenGroup CurrentGroup { get; set; }
        public List<MojoFubenGroup> Groups { get; set; }
        public List<MojoFubenTask> Tasks { get; set; }

        public string StatusDisplay
        {
            get
            {
                if (Unlock == 0) return "未解锁";
                if (Status == 0) return "初始";
                else if (Status == 1) return "闯关中";
                else if (Status == 2) return "等待领奖";
                else if (Status == 3) return "冷却中";
                else return "";
            }
        }

        public Color StatusColor
        {
            get
            {
                if (Unlock == 0) return Color.LightGray;
                if (Status == 0) return Color.LightYellow;
                else if (Status == 2) return Color.LightPink;
                else if (Status == 3) return Color.LightGray;
                else return Color.White;
            }
        }

        public string ColdDownDisplay
        {
            get
            {
                int cd = 0;
                if (DateTime.Now < LastSyncTime.AddSeconds(ColdDown)) cd = (int)(LastSyncTime.AddSeconds(ColdDown) - DateTime.Now).TotalSeconds;
                var ts = new TimeSpan(0, 0, cd);
                if (ts.TotalHours >= 24) return string.Format("{0}天{1}小时", (int)ts.TotalDays, (int)ts.Hours);
                return new TimeSpan(0, 0, cd).ToString();
            }
        }
    }

    public class MojoFubenGroup
    {
        public string GroupId { get; set; }
        public int Order { get; set; }
        public int Unlock { get; set; }
        public string Name { get; set; }
    }

    public class MojoFubenTask
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int Count { get; set; }
        public int SumCount { get; set; }
        public int Status { get; set; }
        public int ColdDown { get; set; }
        public int Unlock { get; set; }
        public DateTime LastSyncTime { get; set; }

        public string ColdDownDisplay
        {
            get
            {
                int cd = 0;
                if (DateTime.Now < LastSyncTime.AddSeconds(ColdDown)) cd = (int)(LastSyncTime.AddSeconds(ColdDown) - DateTime.Now).TotalSeconds;
                return cd == 0 ? SR.Display.ColdDownDisable : new TimeSpan(0, 0, cd).ToString();
            }
        }
    }
}
