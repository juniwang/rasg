using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace sgll.net.Core.Entieies
{
    public class MojoFubenData : AbstractMojoColdDown
    {
        public List<MojoFuben> Fubens { get; set; }
    }

    public class MojoFuben : AbstractMojoColdDown
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int UnlockLevel { get; set; }
        public int Unlock { get; set; }
        public int Status { get; set; }
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
    }

    public class MojoFubenGroup
    {
        public string GroupId { get; set; }
        public int Order { get; set; }
        public int Unlock { get; set; }
        public string Name { get; set; }
    }

    public class MojoFubenTask : AbstractMojoColdDown
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int Count { get; set; }
        public int SumCount { get; set; }
        public int Status { get; set; }
        public int Unlock { get; set; }
    }
}
