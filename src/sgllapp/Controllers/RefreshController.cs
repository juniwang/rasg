using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sgllapp.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sgllapp.Controllers
{
    [Route("api/[controller]")]
    public class RefreshController : Controller
    {
        public RedAtomRefresh Refresher { get; set; }

        [HttpGet]
        //public async Task<object> Get()
        public string Get()
        {
            // await Refresher.RefreshAllCountries();
            // await Refresher.RefreshEquipments();
            return "refreshed";
        }

    }
}
