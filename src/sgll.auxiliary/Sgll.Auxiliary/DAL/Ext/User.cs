using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.DAL
{
    public partial class User
    {
        public string GetMultiCtrlKey()
        {
            return string.Format("{0}-{1}", this.Role, this.Server);
        }
    }
}
