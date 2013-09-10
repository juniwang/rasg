using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entieies;
using sgll.net.Core;

namespace sgll.net
{
    public partial class AdvanceCall : UserControl
    {
        public MainFrame UpCall { get; set; }

        public AdvanceCall()
        {
            InitializeComponent();
        }

        private int CurTimes = 1;
        private int MaxTimes = 1;
        private Timer timer;

        private void button1_Click(object sender, EventArgs e)
        {
            int times = 1;
            if (!int.TryParse(this.textBoxTimes.Text, out times) || times <= 0)
            {
                MessageBox.Show("输入格式不正确：次数", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            int interval = 1;
            if (!int.TryParse(this.textBoxInterval.Text, out interval) || interval <= 0)
            {
                MessageBox.Show("输入格式不正确：间隔", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            this.textBoxResult.Clear();
            MaxTimes = times;
            CurTimes = 1;
            if (UpCall != null && !string.IsNullOrEmpty(UpCall.LoginInfo.Cookie))
            {
                CallMojo();
                if (times > 1)
                {
                    timer = new Timer();
                    timer.Enabled = true;
                    timer.Interval = interval;
                    timer.Tick += new EventHandler(t_Tick);
                    timer.Start();
                }
            }
        }

        void t_Tick(object sender, EventArgs e)
        {
            CurTimes++;
            CallMojo();

            if (CurTimes >= MaxTimes)
            {
                timer.Stop(); 
                timer.Dispose();
                timer = null;
            }
        }

        private void CallMojo()
        {
            string url = this.textBoxUrl.Text.Trim();
            string paras = this.textBoxParameters.Text.Trim();

            Dictionary<string, string> output = new Dictionary<string, string>();
            this.textBoxResult.AppendText(DateTime.Now.ToString() + " 开始执行第" + CurTimes + "次执行......");
            textBoxResult.AppendText(Environment.NewLine);
            UpCall.SGLL.Client.AjaxPost(url, paras, UpCall.LoginInfo.Cookie, output);
            if (output.ContainsKey(SR.Keys.Response))
            {
                this.textBoxResult.AppendText(output[SR.Keys.Response]);
            }
            else if (output.ContainsKey(SR.Keys.Exception))
            {
                textBoxResult.AppendText(output[SR.Keys.Exception]);
            }
            this.textBoxResult.AppendText(Environment.NewLine);
            this.textBoxResult.AppendText(Environment.NewLine);
            this.textBoxResult.AppendText(Environment.NewLine);
        }
    }
}
