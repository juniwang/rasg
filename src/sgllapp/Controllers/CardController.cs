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
    public class CardController : Controller
    {
        public DataStore DataStore { get; set; }

        // GET: api/card
        [HttpGet]
        public object Get()
        {
            return DataStore.Cards;
        }

        // GET api/card/5
        [HttpGet("{id}")]
        public object Get(string id)
        {
            return DataStore.GetById(id);
        }

        // POST api/card
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/card/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]string value)
        {
        }

        // DELETE api/card/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
