using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace sgllapp.Data
{
    public class RedAtomRefresh
    {
        // persons
        static readonly string[] countries = new string[] { "shu", "wei", "wu", "qun", "jin", "dong" };
        static string personUrlFormat = "http://zlz.sg.redatoms.com/controller/api/getPersonList.php?country={0}";
        static string skillUrlFormat = "http://zlz.sg.redatoms.com/controller/api/getEntitySkill.php?id={0}";

        // equipments
        static readonly string[] categories = new string[] { "wuqi", "fangju", "zuoqi", "baowu" };
        const string PUTONG = "putong";
        const string WANMEI = "wanmei";
        static string equipUrlFormat = "http://zlz.sg.redatoms.com/controller/api/getEquipList.php?category={0}&rebirth={1}";
        List<Card> allCards;

        // pics
        /* example url:
         * http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/5/small/b101.png
         * http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/4/small/z107.png
         * http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/3/small/f101.png
         * http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/2/small/w114.png
         * http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/1/small/j1104.png
        */
        static readonly string[] sizes = new string[] { "small", "large" };
        static readonly string imageUriFormat = "http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/{0}/{1}/{2}";


        public void DownloadPics()
        {
            using (var db = SgllContext.Create())
            {
                foreach (var card in db.Cards.ToList())
                {
                    foreach (var size in sizes)
                    {
                        var url = string.Format(imageUriFormat, card.Category.ToString(), size, card.ImageName);
                        string local = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "pics", card.Category.ToString(), size, card.ImageName);
                        FileInfo fi = new FileInfo(local);
                        if (!fi.Directory.Exists)
                            fi.Directory.Create();
                        if (fi.Exists)
                            continue;
                            
                        using (WebClient wc = new WebClient())
                        {
                            wc.DownloadFile(new Uri(url), local);
                        }
                        Thread.Sleep(50);
                    }
                }
            }
        }


        public async Task RefreshEquipments()
        {
            foreach (var cat in categories)
            {
                await RefreshEquipCategory(cat);
            }
        }

        public async Task RefreshEquipCategory(string category, string rebirth = PUTONG)
        {
            string data = await SendGet(string.Format(equipUrlFormat, category, rebirth));
            if (string.IsNullOrWhiteSpace(data))
                return;

            var cards = JsonConvert.DeserializeObject<Card[]>(data);
            using (var db = SgllContext.Create())
            {
                foreach (var card in cards)
                {
                    var existing = db.Cards.FirstOrDefault(p => p.Id == card.Id);
                    if (existing != null)
                    {
                        // db.Cards.Remove(existing);
                        await db.SaveChangesAsync();
                    }
                    card.CreateTime = DateTime.UtcNow;
                    await db.Cards.AddAsync(card);
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task RefreshAllCountries()
        {
            using (var db = SgllContext.Create())
            {
                allCards = db.Cards.ToList();
            }

            foreach (var country in countries)
            {
                await RefreshSingleCountry(country);
                Thread.Sleep(1000);
            }
        }

        public async Task RefreshSingleCountry(string country, bool refreshSkill = true)
        {
            if (!countries.Contains(country))
                return;

            var persons = await SendGet(string.Format(personUrlFormat, country));
            if (string.IsNullOrWhiteSpace(persons))
                return;

            List<string> cardsToRefreshSkill = new List<string>();

            var cards = JsonConvert.DeserializeObject<Card[]>(persons);
            using (var db = SgllContext.Create())
            {
                foreach (var card in cards)
                {
                    var existing = allCards.FirstOrDefault(c => c.Id == card.Id);
                    if (existing != null)
                    {
                        // db.Cards.Remove(existing);
                        await db.SaveChangesAsync();
                    }
                    await db.Cards.AddAsync(card);
                    await db.SaveChangesAsync();
                    if (refreshSkill)
                    {
                        cardsToRefreshSkill.Add(card.Id);
                    }
                }
            }

            if (refreshSkill)
            {
                foreach (var id in cardsToRefreshSkill)
                {
                    await RefreshSkill(id);
                    Thread.Sleep(300);
                }
            }
        }

        public async Task RefreshSkill(string cardId)
        {
            var data = await SendGet(string.Format(skillUrlFormat, cardId));
            if (string.IsNullOrWhiteSpace(data))
                return;

            var skills = JsonConvert.DeserializeObject<Skill[]>(data);
            using (var db = SgllContext.Create())
            {
                var existing = db.Skills.Where(s => s.CardId == cardId).ToList();
                db.Skills.RemoveRange(existing);
                await db.SaveChangesAsync();

                foreach (var skill in skills)
                {
                    skill.CardId = cardId;
                    await db.Skills.AddAsync(skill);
                    await db.SaveChangesAsync();
                }
            }
        }

        private async Task<string> SendGet(string url)
        {
            using (var http = new HttpClient())
            {
                using (var resp = await http.GetAsync(url))
                {
                    return await resp.Content.ReadAsStringAsync();
                }
            }
        }
    }
}
