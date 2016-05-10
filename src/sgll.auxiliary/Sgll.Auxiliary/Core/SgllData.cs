using Sgll.Auxiliary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public class SgllData
    {
        public SgllData(User user)
        {
            this.User = user;
        }

        public User User { get; private set; }
    }
}
