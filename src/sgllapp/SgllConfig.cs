using System;
using Microsoft.Extensions.Configuration;

namespace sgllapp
{
    public static class SgllConfig
    {
        static IConfiguration config;

        static SgllConfig()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            config = builder.Build();
        }

        public static class Db
        {
            public static string MySqlConnectionString
            {
                get
                {

                    return config["db:mysqlConnectionString"];
                }
            }
        }
    }
}
