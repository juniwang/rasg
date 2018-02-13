using System;
using Microsoft.EntityFrameworkCore;

namespace sgllapp.Data
{
    public partial class SgllContext : DbContext
    {
        public SgllContext(DbContextOptions<SgllContext> options) : base(options)
        {
        }

        private SgllContext()
        {

        }

        public static SgllContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<SgllContext>();
            optionsBuilder.UseMySQL(SgllConfig.Db.MySqlConnectionString);

            //Ensure database creation
            var context = new SgllContext(optionsBuilder.Options);
            context.Database.EnsureCreated();

            return context;
        }
    }
}
