// -----------------------------------------------------------------------
// <copyright file="SFeature.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Newtonsoft.Json;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class SFeature
    {
        [JsonIgnore]
        public string Name
        {
            get
            {
                return SGLLController.QueueTitles[TaskId];
            }
        }
        public bool Enabled { get; set; }
        public int TaskId { get; set; }
        public Dictionary<string, string> Parameters { get; set; }

        public SFeature(int qid)
        {
            TaskId = qid;
        }
    }
}
