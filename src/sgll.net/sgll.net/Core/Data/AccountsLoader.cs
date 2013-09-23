// -----------------------------------------------------------------------
// <copyright file="AcountsLoader.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.IO;
    using sgll.net.Core.Entieies;
    using Newtonsoft.Json;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class AccountsLoader
    {
        private static readonly string UserDataFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.json");

        public static List<LoginUser> Load()
        {
            if (File.Exists(UserDataFile))
            {
                try
                {
                    StreamReader reader = new StreamReader(UserDataFile, Encoding.UTF8);
                    string content = reader.ReadToEnd();
                    reader.Close();
                    return JsonConvert.DeserializeObject<List<LoginUser>>(content);
                }
                catch (Exception)
                {
                }
            }
            return new List<LoginUser>();
        }

        public static void Save(List<LoginUser> users)
        {
            string json = JsonConvert.SerializeObject(users);
            StreamWriter writer = new StreamWriter(UserDataFile, false, Encoding.UTF8);
            writer.Write(json);
            writer.Close();
        }
    }
}
