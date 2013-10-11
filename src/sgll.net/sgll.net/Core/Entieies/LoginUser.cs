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
        [JsonIgnore]
        public string Token { get; set; }
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

        public SFeature GetFeature(int id)
        {
            if (Features == null)
                return null;
            return Features.FirstOrDefault(p => p.TaskId == id);
        }

        public string GetParameter(int id, string key, string def)
        {
            var feature = GetFeature(id);
            if (feature != null && feature.Parameters != null && feature.Parameters.ContainsKey(key))
            {
                return feature.Parameters[key];
            }
            return def;
        }
    }
}
