using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Security.Cryptography;
using System.IO;

namespace Sgll.Net.SN
{
    class Program
    {
        static void Main(string[] args)
        {
            string pubKey = ConfigurationManager.AppSettings["pubKey"];
            string priKey = ConfigurationManager.AppSettings["priKey"];
            string input = ConfigurationManager.AppSettings["input"];
            string user = ConfigurationManager.AppSettings["user"];

            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                SHA1Managed sha = new SHA1Managed();
                rsa.FromXmlString(priKey);
                Console.WriteLine("begin to encode:");
                RSAPKCS1SignatureFormatter signFormatter = new RSAPKCS1SignatureFormatter(rsa);
                signFormatter.SetHashAlgorithm("SHA1");
                byte[] source = System.Text.ASCIIEncoding.UTF8.GetBytes(input);
                byte[] result = sha.ComputeHash(source);
                byte[] b = signFormatter.CreateSignature(result);
                var signature = Convert.ToBase64String(b);

                string outputFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "sn", input + ".key");
                FileInfo fi = new FileInfo(outputFile);
                if (!fi.Directory.Exists)
                {
                    fi.Directory.Create();
                }
                StreamWriter sw = new StreamWriter(fi.OpenWrite(), Encoding.UTF8);
                sw.Write(signature);
                sw.Close();
                Console.WriteLine();
                Console.WriteLine(signature);



                using (RSACryptoServiceProvider rsa2 = new RSACryptoServiceProvider())
                {
                    rsa2.FromXmlString(pubKey);
                    RSAPKCS1SignatureDeformatter decodeFormatter = new RSAPKCS1SignatureDeformatter(rsa2);
                    decodeFormatter.SetHashAlgorithm("SHA1");
                    byte[] key = Convert.FromBase64String(signature);
                    byte[] name = sha.ComputeHash(ASCIIEncoding.UTF8.GetBytes(input));
                    if (decodeFormatter.VerifySignature(name, key))
                    {
                        Console.WriteLine("===========can be decoded");
                    }
                    else
                    {
                        Console.WriteLine("===CANOT be decoded..................");
                    }
                }
            }
        }
    }
}
