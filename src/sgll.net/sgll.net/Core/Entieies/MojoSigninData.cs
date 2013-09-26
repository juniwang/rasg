// -----------------------------------------------------------------------
// <copyright file="MojoSigninData.cs" company="Microsoft">
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
    public class MojoSigninData : AbstractMojoEntity
    {
        public bool NeedSignIn { get; set; }
        public string AwardToday { get; set; }
    }
}
