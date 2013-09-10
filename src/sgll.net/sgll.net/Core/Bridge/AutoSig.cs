using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Web;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

namespace sgll.net.Core.Bridge
{
    class AutoSig
    {
        public static string Signature = "";
        private static string SIGN_URL = "https://42.121.129.141/a/~HttpGet.php?s=";
        private static System.Timers.Timer timer1;

        public static bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
            return true;
        }

        static void timer1_Tick(object sender, EventArgs e)
        {
            GetSig();
        }

        static void StartSigTimer()
        {
            if (timer1 == null)
            {
                timer1 = new System.Timers.Timer();
                timer1.Enabled = true;
                timer1.Elapsed += new ElapsedEventHandler(timer1_Elapsed);
                timer1.Interval = 30000;
                timer1.Start();
            }
        }

        static void timer1_Elapsed(object sender, ElapsedEventArgs e)
        {
            Task t = new Task(() => GetSig());
            t.Start();
        }

        public static void GetSig()
        {
            StartSigTimer();

            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(CheckValidationResult);
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(SIGN_URL + HttpUtility.UrlEncode(Signature));
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = "SSL";
            req.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";

            req.ContentType = "application/x-www-form-urlencoded";
            req.Referer = "http://wsa.sg21.redatoms.com";
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();

                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    var sr = new StreamReader(resp.GetResponseStream(), Encoding.UTF8);
                    dynamic task = JObject.Parse(sr.ReadToEnd());
                    sr.Close();
                    Signature = task.sig;
                }
                resp.Close();
            }
            catch (Exception e)
            {
                if (resp != null)
                    resp.Close();
            }
        }
    }
}
