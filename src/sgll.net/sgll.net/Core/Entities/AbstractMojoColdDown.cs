// -----------------------------------------------------------------------
// <copyright file="AbstractMojoEntity.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public abstract class AbstractMojoColdDown
    {
        private int _coldDown = 600;

        public DateTime LastSyncTime { get; set; }
        public int ColdDown
        {
            get { return _coldDown; }
            set { _coldDown = value; }
        }

        public bool CDFinished
        {
            get
            {
                return DateTime.Now >= LastSyncTime.AddSeconds(ColdDown);
            }
        }
        public string ColdDownDisplay
        {
            get
            {
                var ts = LastSyncTime.AddSeconds(ColdDown) - DateTime.Now;
                int cd = 0;
                if (ts.TotalSeconds > 0)
                    cd = (int)ts.TotalSeconds;
                var ts2 = new TimeSpan(0, 0, cd);
                if (ts2.TotalHours >= 24)
                {
                    return string.Format("{0}天{1}时", ts2.Days, ts2.Hours);
                }
                else
                    return ts2.ToString();
            }
        }
    }
}
