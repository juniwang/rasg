using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Microsoft.Win32;
using System.Security.Cryptography;
using System.IO;

namespace Sgll.Auxiliary.UI
{
    public partial class Register : Form
    {
        private const string SFX = "XIAOHE";
        public Register()
        {
            InitializeComponent();
        }

        private void Register_Load(object sender, EventArgs e)
        {
            this.textBox1.Text = GetSNKey();
        }

        private string GetSNKey()
        {
            RegistryKey rk = Registry.LocalMachine;
            var sub1 = rk.OpenSubKey("SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion");
            var pid = (string)sub1.GetValue("ProductId") + SFX;
            return Math.Abs(pid.GetHashCode()).ToString();
        }

        private string GetSN()
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, GetSNKey() + ".key");
            if (File.Exists(path))
            {
                using (StreamReader sr = new StreamReader(path, Encoding.UTF8))
                {
                    return sr.ReadToEnd();
                }
            }
            return string.Empty;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string hash = textBox1.Text;
            string sn = textBox2.Text.Trim();
            if (Verify(hash, sn))
            {
                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, GetSNKey() + ".key");
                using (StreamWriter sw = new StreamWriter(path, false, Encoding.UTF8))
                {
                    sw.Write(sn);
                }
                DialogResult = System.Windows.Forms.DialogResult.OK;
            }
            else
            {
                MessageBox.Show("验证码不正确", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                DialogResult = System.Windows.Forms.DialogResult.None;
            }
        }

        public bool CheckSN()
        {
            string sn = GetSN();
            if (string.IsNullOrEmpty(sn))
                return false;
            return Verify(GetSNKey(), sn);
        }

        private bool Verify(string rgb, string signature)
        {
            string pubkey = "<RSAKeyValue><Modulus>rWTCCC8lHyR+q4pmdfwzVzGURcdW1m8saqsJ8HxBuSEzZ45dsizxJtUBGyFbNzsFtsYKt915W2vchg2nb0jnC/9MrLYY7lV3/SqisQifmZcNLPem+jCpZ3KHAB1/PqUg64gH1y7dsoDkNT5Dd/6ujhbJKPUp4kmj9GGHkd/lWcM=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                rsa.FromXmlString(pubkey);
                RSAPKCS1SignatureDeformatter decodeFormatter = new RSAPKCS1SignatureDeformatter(rsa);
                decodeFormatter.SetHashAlgorithm("SHA1");
                byte[] sn = Convert.FromBase64String(signature);
                SHA1Managed sha = new SHA1Managed();
                byte[] key = sha.ComputeHash(ASCIIEncoding.UTF8.GetBytes(rgb));
                return decodeFormatter.VerifySignature(key, sn);
            }
        }
    }
}
