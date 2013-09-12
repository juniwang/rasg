using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Globalization;
using System.Text.RegularExpressions;

namespace sgll.net.Core.Bridge
{
    public class IPadBridge : IBridge
    {
        static readonly string MojoDomain = "wsa.sg21.redatoms.com";
        static readonly string AjaxBase = "http://wsa.sg21.redatoms.com/mojo/ajax";

        private void EnsureSignature()
        {
            if (string.IsNullOrEmpty(AutoSig.Signature))
                AutoSig.GetSig();
        }

        string UnicodeToString(string srcText)
        {
            string dst = "";
            string src = srcText;
            int len = srcText.Length / 6;
            for (int i = 0; i <= len - 1; i++)
            {
                string str = "";
                str = src.Substring(0, 6).Substring(2);
                src = src.Substring(6);
                byte[] bytes = new byte[2];
                bytes[1] = byte.Parse(int.Parse(str.Substring(0, 2), NumberStyles.HexNumber).ToString());
                bytes[0] = byte.Parse(int.Parse(str.Substring(2, 2), NumberStyles.HexNumber).ToString());
                dst += Encoding.Unicode.GetString(bytes);
            }
            return dst;
        }

        public void Login(string username, string password, Dictionary<string, string> output)
        {
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(AjaxBase + "/validate/login");
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 Mojo/IOS";
            req.Accept = "application/json, text/javascript, */*; q=0.01";
            req.ContentType = "application/x-www-form-urlencoded";
            req.Referer = "http://wsa.sg21.redatoms.com";
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            string contents = "UserLoginForm%5Busername%5D=" + username + "&UserLoginForm%5Bpassword%5D=" + password + "&ajax=validate-form";
            req.AllowAutoRedirect = false;

            var bytes = Encoding.UTF8.GetBytes(contents);
            req.GetRequestStream().Write(bytes, 0, bytes.Length);

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
                if (resp.Headers.AllKeys.Contains("Set-Cookie"))
                {
                    var values = resp.Headers.GetValues("Set-Cookie");
                    foreach (var cv in values)
                    {
                        if (cv.IndexOf("bfff9d71bbba80d88def25ce6c5988b1") >= 0)
                        {
                            string[] _cv = cv.Split(';');
                            if (output.ContainsKey(SR.Keys.Cookie)) output.Remove(SR.Keys.Cookie);
                            output.Add(SR.Keys.Cookie, _cv[0]);
                        }
                    }
                }

                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    var sr = new StreamReader(resp.GetResponseStream());
                    output.Add(SR.Keys.Response, sr.ReadToEnd());
                    sr.Close();
                }
                resp.Close();
            }
            catch (Exception e)
            {
                output.Add(SR.Keys.Exception, e.Message);
                output.Add(SR.Keys.StackTrack, e.StackTrace);
            }
            finally
            {
                if (resp != null)
                    resp.Close();
            }
        }

        public Tuple<bool, string> Post(string url, string contents, string cookie)
        {
            EnsureSignature();

            if (!url.StartsWith(AjaxBase))
            {
                url = AjaxBase + "/" + url.TrimStart('/');
            }

            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 Mojo/IOS";
            req.Accept = "application/json, text/javascript, */*; q=0.01";
            req.ContentType = "application/x-www-form-urlencoded";
            req.Referer = "http://wsa.sg21.redatoms.com";
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            req.Headers.Add("Signature", AutoSig.Signature);

            if (!string.IsNullOrWhiteSpace(cookie))
            {
                var cks = cookie.Split('=');
                var ckk = new Cookie(cks[0], cks[1]);
                ckk.Domain = MojoDomain;
                req.CookieContainer = new CookieContainer();
                req.CookieContainer.Add(ckk);
            }
            req.AllowAutoRedirect = false;
            if (!string.IsNullOrWhiteSpace(contents))
            {
                var bytes = Encoding.UTF8.GetBytes(contents);
                req.GetRequestStream().Write(bytes, 0, bytes.Length);
            }

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    var sr = new StreamReader(resp.GetResponseStream());
                    var target = sr.ReadToEnd();
                    target = Regex.Replace(target, @"(\\u[a-z0-9A-Z]{4})+", p => { try { return UnicodeToString(p.Value); } catch { return p.Value; } });
                    return new Tuple<bool, string>(true, target);
                }
                resp.Close();
                return new Tuple<bool, string>(false, resp.StatusDescription);
            }
            catch (Exception e)
            {
                return new Tuple<bool, string>(false, e.Message);
            }
            finally
            {
                if (resp != null)
                    resp.Close();
            }
        }
    }
}
