using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoMissionData
    {
        public MojoMissionScenario CurScenario { get; set; }
        public MojoMissionTaskGroup CurTaskGroup { get; set; }
        public List<MojoMissionTaskGroup> TaskGroups { get; set; }
        public List<MojoMissionTask> Tasks { get; set; }
    }

    public class MojoMissionScenario
    {
        public string ScenarioId { get; set; }
        public string Order { get; set; }
        public int Unlock { get; set; }
        public string Name { get; set; }
    }

    public class MojoMissionTaskGroup
    {
        public string ScenarioId { get; set; }
        public string TaskGroupId { get; set; }
        public int Level { get; set; }
        public int Order { get; set; }
        public int Unlock { get; set; }
        public string Name { get; set; }
    }

    public class MojoMissionTask
    {
        public string Id { get; set; }
        public string ScenarioId { get; set; }
        public string TaskGroupId { get; set; }
        public string TaskId { get; set; }
        public int Level { get; set; }
        public int Count { get; set; }
        public int SumCount { get; set; }
        /// <summary>
        /// 0:未开始 1:进行中 2:已完成
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// 0:锁定 1:已解锁
        /// </summary>
        public int Unlock { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 消耗精力值
        /// </summary>
        public int EP { get; set; }
    }
}
