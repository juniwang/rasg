using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading;

namespace sgllapp.Data
{
    public class DataStore
    {
        List<Card> allCards = new List<Card>();

        public DataStore()
        {
            ReloadAll();
        }

        public List<Card> Cards
        {
            get
            {
                return allCards;
            }
        }

        public Card GetById(string id)
        {
            return allCards.FirstOrDefault(p => p.Id == id);
        }

        private void ReloadAll()
        {
            using (var db = SgllContext.Create())
            {
                allCards = db.Cards
                             //.Include(c => c.Skills)
                             .ToList();
            }
        }


    }

}
