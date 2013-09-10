// -----------------------------------------------------------------------
// <copyright file="SFeature.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Entieies
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class SFeature
    {
        public string Name { get; set; }
        public bool Enabled { get; set; }
        public int TaskId { get; set; }
        public Dictionary<string, string> Parameters { get; set; }

        public SFeature(int qid)
        {
            TaskId = qid;
        }
    }
}
