// -----------------------------------------------------------------------
// <copyright file="MojoSigninData.cs" company="Microsoft">
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
    public class MojoSigninData : AbstractMojoColdDown
    {
        public SignStatus Status { get; set; }
        public string AwardToday { get; set; }
    }

    public enum SignStatus
    {
        Unknown,
        NeedSignin,
        Completed
    }
}
