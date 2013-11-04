using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Globalization;
using System.Text.RegularExpressions;
using sgll.net.Core.Entities;
using System.IO.Compression;

namespace sgll.net.Core.Bridge
{
    public class IPadBridge : IBridge
    {
        static readonly string MojoDomain = "wsa.sg21.redatoms.com";
        static readonly string AjaxBase = "http://wsa.sg21.redatoms.com/mojo/ajax";
        static readonly string UserAgent = "Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 Mojo/IOS/iPad";

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

        public Tuple<bool, string> Login(LoginUser user)
        {
            string contents = "odin1=d3927128fa9b13e1320218c320baa822&token=fe07aacd8020f78cbde21a330b9fca28&ida=FD2BF277-5E85-4AEA-AA77-7A9BBD83D6FC&open_udid=7397a03add17def0a538d3fa68c00aead2dcf22b";
            var tuple = PostNoLogin("/device", contents);
            if (tuple.Item1)
            {
                tuple = PostNoLogin("/system/clientcheck", "version=1.9");
                if (tuple.Item1)
                {
                    return ValidatePassword(user);
                }
            }

            return tuple;
        }

        #region fetch signature key

        #endregion

        #region PostNoLogin
        private Tuple<bool, string> PostNoLogin(string url, string contents)
        {
            EnsureSignature();
            if (!url.StartsWith(AjaxBase))
            {
                url = AjaxBase + "/" + url.TrimStart('/');
            }

            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = "Mojo/IOS/iPad";
            req.Accept = "";
            req.ContentType = "application/x-www-form-urlencoded";
            req.KeepAlive = true;
            req.Headers.Add("Accept-Language", "zh-cn");
            req.Headers.Add("X-Mojo", "");
            req.Headers.Add("clientversion", "1.9");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            req.Headers.Add("Signature", AutoSig.Signature);

            req.AllowAutoRedirect = false;
            req.ServicePoint.Expect100Continue = false;
            req.KeepAlive = true;
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
                    string responseBody = string.Empty;
                    if (resp.ContentEncoding.ToLower().Contains("gzip"))
                    {
                        using (GZipStream stream = new GZipStream(resp.GetResponseStream(), CompressionMode.Decompress))
                        {
                            using (StreamReader reader = new StreamReader(stream))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    else if (resp.ContentEncoding.ToLower().Contains("deflate"))
                    {
                        using (DeflateStream stream = new DeflateStream(resp.GetResponseStream(), CompressionMode.Decompress))
                        {
                            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    else
                    {
                        using (Stream stream = resp.GetResponseStream())
                        {
                            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    responseBody = Regex.Replace(responseBody, @"(\\u[a-z0-9A-Z]{4})+", p => { try { return UnicodeToString(p.Value); } catch { return p.Value; } });
                    if (string.IsNullOrWhiteSpace(responseBody))
                        return new Tuple<bool, string>(false, "no response");
                    return new Tuple<bool, string>(true, responseBody);
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
        #endregion

        #region ValidatePassword
        private Tuple<bool, string> ValidatePassword(LoginUser user)
        {
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(AjaxBase + "/validate/login");
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = UserAgent;
            req.Accept = "application/json, text/javascript, */*; q=0.01";
            req.ContentType = "application/x-www-form-urlencoded";
            req.Referer = "http://wsa.sg21.redatoms.com";
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            string contents = "UserLoginForm%5Busername%5D=" + user.Username + "&UserLoginForm%5Bpassword%5D=" + user.Password + "&ajax=validate-form";
            req.AllowAutoRedirect = false;
            req.ServicePoint.Expect100Continue = false;
            req.KeepAlive = true;

            var bytes = Encoding.UTF8.GetBytes(contents);
            req.GetRequestStream().Write(bytes, 0, bytes.Length);

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
                if (resp.Headers.AllKeys.Contains("Set-Cookie"))
                {
                    //Dictionary<string, string> cookies = new Dictionary<string, string>();
                    CookieContainer container = new CookieContainer();
                    foreach (var cv in resp.Headers.GetValues("Set-Cookie"))
                    {
                        //if (cv.IndexOf("bfff9d71bbba80d88def25ce6c5988b1") >= 0
                        //    || cv.IndexOf("PHPSESSID") >= 0
                        //    || cv.IndexOf("SERVERID") >= 0
                        //    )
                        //{
                        string[] _cv = cv.Split(';')[0].Split('=');
                        if (_cv.Length > 1)
                        {
                            //if (cookies.ContainsKey(_cv[0])) cookies.Remove(_cv[0]);
                            //cookies.Add(_cv[0], _cv[1]);
                            Cookie cookie = new Cookie(_cv[0], _cv[1]);
                            cookie.Domain = MojoDomain;
                            cookie.Path = "/";
                            container.Add(cookie);
                        }
                        //}
                    }
                    user.Cookies = container;
                }
                if (resp.Headers.AllKeys.Contains("MOJO_A_T"))
                {
                    user.Token = resp.Headers["MOJO_A_T"];
                }

                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    using (var sr = new StreamReader(resp.GetResponseStream()))
                    {
                        return new Tuple<bool, string>(true, sr.ReadToEnd());
                    }
                }
                return new Tuple<bool, string>(false, "登录失败:" + resp.StatusDescription);
            }
            catch (Exception e)
            {
                return new Tuple<bool, string>(false, "登录失败:" + e.Message);
            }
            finally
            {
                if (resp != null)
                    resp.Close();
            }
        }
        #endregion

        #region SwitchAccount
        public Tuple<bool, string> SwitchAccount(string cookie, string token, out string token2)
        {
            token2 = "";
            EnsureSignature();
            var url = AjaxBase + "/system/switchAccount";
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = UserAgent;
            req.Accept = "application/json, text/javascript, */*; q=0.01";
            req.ContentType = "application/x-www-form-urlencoded";
            req.Referer = "http://wsa.sg21.redatoms.com/mojo/ipad/home";
            req.KeepAlive = true;
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("Accept-Language", "zh_cn");
            req.Headers.Add("X-Mojo", "");
            req.Headers.Add("clientversion", "1.9");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            req.Headers.Add("Signature", AutoSig.Signature);
            req.Headers.Add("Mojo-A-T", token);

            if (!string.IsNullOrWhiteSpace(cookie))
            {
                var cks = cookie.Split('=');
                var ckk = new Cookie(cks[0], cks[1]);
                ckk.Domain = MojoDomain;
                req.CookieContainer = new CookieContainer();
                req.CookieContainer.Add(ckk);
            }
            req.AllowAutoRedirect = false;
            var contents = "playerId=1916726&accessToken=";
            var bytes = Encoding.UTF8.GetBytes(contents);
            req.GetRequestStream().Write(bytes, 0, bytes.Length);

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    token2 = resp.Headers["MOJO_A_T"];

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
        #endregion

        #region Post
        public Tuple<bool, string> Post(string url, string contents, LoginUser user)
        {
            if (user == null)
                return new Tuple<bool, string>(false, "用户不能为空!");

            EnsureSignature();

            if (!url.StartsWith(AjaxBase))
            {
                url = AjaxBase + "/" + url.TrimStart('/');
            }
            //url = url + "?_=" + DateTime.Now.Ticks.ToString();

            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            req.Method = "post";
            req.Timeout = 15000;
            req.UserAgent = UserAgent;
            //req.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 Mojo/IOS";
            //req.UserAgent = "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/537.36 Mojo/IOS";
            req.Accept = "application/json, text/javascript, */*; q=0.01";
            req.ContentType = "application/x-www-form-urlencoded";
            //req.ContentType = "application/json";
            req.Referer = "http://wsa.sg21.redatoms.com/mojo/ipad/home";
            req.KeepAlive = true;
            req.Headers.Add("gamelanguage", "zh_cn");
            req.Headers.Add("Accept-Language", "zh-cn");
            req.Headers.Add("Accept-Encoding", "gzip, deflate");
            req.Headers.Add("X-Mojo", "");
            req.Headers.Add("clientversion", "1.9");
            req.Headers.Add("X-Requested-With", "XMLHttpRequest");
            req.Headers.Add("Signature", AutoSig.Signature);
            req.Headers.Add("Mojo-A-T", user.Token);
            req.Headers.Add("Origin", "http://wsa.sg21.redatoms.com");
            req.ProtocolVersion = HttpVersion.Version10;
            req.ServicePoint.Expect100Continue = false;

            req.CookieContainer = user.Cookies;
            req.AllowAutoRedirect = false;
            if (!string.IsNullOrWhiteSpace(contents))
            {
                var bytes = Encoding.UTF8.GetBytes(contents);
                req.GetRequestStream().Write(bytes, 0, bytes.Length);
                req.ContentLength = bytes.Length;
            }

            HttpWebResponse resp = null;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
                if (resp.Headers.AllKeys.Contains("Set-Cookie"))
                {
                    var values = resp.Headers.GetValues("Set-Cookie");
                    foreach (var cv in values)
                    {
                        //if (cv.IndexOf("bfff9d71bbba80d88def25ce6c5988b1") >= 0
                        //    || cv.IndexOf("PHPSESSID") >= 0
                        //    || cv.IndexOf("SERVERID") >= 0
                        //    )
                        //{
                        string[] _cv = cv.Split(';')[0].Split('=');
                        if (_cv.Length > 1)
                        {
                            Cookie cookie = user.Cookies.GetCookies(new Uri("http://wsa.sg21.redatoms.com/"))["PHPSESSID"];
                            if (cookie == null)
                            {
                                cookie = new Cookie(_cv[0], _cv[1]);
                                cookie.Domain = MojoDomain;
                                cookie.Path = "/";
                                user.Cookies.Add(cookie);
                            }
                            else
                            {
                                cookie.Value = _cv[1];
                            }
                        }
                        //}
                    }
                }

                if (resp.StatusCode == HttpStatusCode.OK)
                {
                    string responseBody = string.Empty;
                    if (resp.ContentEncoding.ToLower().Contains("gzip"))
                    {
                        using (GZipStream stream = new GZipStream(resp.GetResponseStream(), CompressionMode.Decompress))
                        {
                            using (StreamReader reader = new StreamReader(stream))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    else if (resp.ContentEncoding.ToLower().Contains("deflate"))
                    {
                        using (DeflateStream stream = new DeflateStream(resp.GetResponseStream(), CompressionMode.Decompress))
                        {
                            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    else
                    {
                        using (Stream stream = resp.GetResponseStream())
                        {
                            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                            {
                                responseBody = reader.ReadToEnd();
                            }
                        }
                    }
                    responseBody = Regex.Replace(responseBody, @"(\\u[a-z0-9A-Z]{4})+", p => { try { return UnicodeToString(p.Value); } catch { return p.Value; } });
                    if (string.IsNullOrWhiteSpace(responseBody))
                        return new Tuple<bool, string>(false, "no response");
                    return new Tuple<bool, string>(true, responseBody);
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
        #endregion

        #region Get
        public Tuple<bool, string> Get(string url, string contents, string cookie)
        {
            EnsureSignature();

            //if (!url.StartsWith(AjaxBase))
            //{
            //    url = AjaxBase + "/" + url.TrimStart('/');
            //}

            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            req.Method = "get";
            req.Timeout = 15000;
            req.UserAgent = UserAgent;
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
        #endregion
    }
}
