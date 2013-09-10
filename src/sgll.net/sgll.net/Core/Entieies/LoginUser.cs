// -----------------------------------------------------------------------
// <copyright file="AccountInfo.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Entieies
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Newtonsoft.Json;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class LoginUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Server { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public string Cookie { get; set; }
        public List<SFeature> Features { get; set; }

        public string GetKey()
        {
            string invalidchar = "\\/:*?\"<>|";
            string str = string.Format("{0}@{1}", Username, Server);
            foreach (var x in invalidchar)
            {
                str = str.Replace(x, '-');
            }
            return str;
        }
    }
}
