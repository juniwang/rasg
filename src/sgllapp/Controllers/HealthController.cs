using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using sgllapp.Data;

namespace sgllapp.Controllers
{
    [Route("api/health")]
    public class HealthController : Controller
    {
        public IHealth Health
        {
            get;
            set;
        }

        [HttpGet]
        public object Get()
        {
            return Health.ReportHealth();
        }
    }

    public interface IHealth
    {
        Dictionary<string, object> ReportHealth();
    }

    public class DefaultHealth : IHealth
    {
        public Dictionary<string, object> ReportHealth()
        {
            var health = new Dictionary<string, object>();
            health.Add("starttime", DateTime.UtcNow.ToString());
            health.Add("database", ReportMysql());
            return health;
        }

        private Dictionary<string, string> ReportMysql()
        {
            var mysql = new Dictionary<string, string>();
            mysql.Add("provider", "MySQL");
            try
            {
                using (var db = SgllContext.Create())
                {
                    mysql.Add("cards", db.Cards.Count().ToString());
                    mysql.Add("health", "Ready");
                }
            }
            catch (Exception ex)
            {
                mysql.Add("health", "error");
                mysql.Add("error", ex.Message);
            }

            return mysql;
        }
    }
}
