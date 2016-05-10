using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sgll.Auxiliary.DAL;
using System.Data.Entity;

namespace Sgll.Auxiliary.Core
{
    class AccountsLoader
    {
        public static List<User> LoadAll()
        {
            using (SgllEntities db = new SgllEntities())
            {
                return db.Users.ToList();
            }
        }

        public static void InsertUser(User user)
        {
            using (SgllEntities db = new SgllEntities())
            {
                try
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                }
            }
        }

        public static void InsertOrUpdate(User user)
        {
            using (SgllEntities db = new SgllEntities())
            {
                try
                {
                    db.Entry(user).State = user.Id == 0 ? EntityState.Added : EntityState.Modified;
                    db.SaveChanges();
                }
                catch (Exception)
                {
                }
            }
        }

        public static void DeleteUsers(List<User> users)
        {
            using (SgllEntities db = new SgllEntities())
            {
                try
                {
                    users.ForEach(u => db.Users.Attach(u));
                    db.Users.RemoveRange(users);
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
            }
        }
    }
}
