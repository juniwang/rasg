using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using sgll.net.Core.Entities;

namespace sgll.net.Core.Bridge
{
    public interface IBridge
    {
        Tuple<bool, string> Login(LoginUser user);
        Tuple<bool, string> Post(string url, string contents, LoginUser user);
    }
}
