using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Bridge
{
    public interface IBridge
    {
        void Login(string username, string password, Dictionary<string, string> output);
        void AjaxPost(string url, string contents, string cookie, Dictionary<string, string> output);
    }
}
