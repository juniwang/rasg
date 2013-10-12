using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entities;
using sgll.net.Core;

namespace sgll.net
{
    public partial class AdvanceCall : UserControl
    {
        public MainFrame UpCall { get; set; }
        private delegate void AdvanceCall_d(object sender, AdvanceCallArgs e);

        private int CurTimes = 1;
        private int MaxTimes = 1;
        private Timer timer;
        private AdvanceCallArgs args;

        public AdvanceCall()
        {
            InitializeComponent();
        }

        void SGLL_OnAdvanceCall(object sender, AdvanceCallArgs e)
        {
            if (e == null || e.SenderUserName == UpCall.SGLL.Data.LoginUser.Username)
                return;

            try
            {
                Invoke(new AdvanceCall_d(Local_AdvanceCall), new object[] { sender, e });
            }
            catch (Exception)
            { }
        }

        void Local_AdvanceCall(object sender, AdvanceCallArgs e)
        {
            args = e;
            Reset();
            StartMojoCall();
        }

        private void Reset()
        {
            this.textBoxResult.Clear();
            CurTimes = 1;
            MaxTimes = args.Times;
            this.textBoxUrl.Text = args.Url;
            this.textBoxParameters.Text = args.Parameters;
            if (timer != null)
            {
                timer.Stop();
                timer.Dispose();
                timer = null;
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (UpCall == null || UpCall.SGLL == null)
                return;

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

            args = new AdvanceCallArgs
            {
                Url = this.textBoxUrl.Text,
                Times = times,
                SenderUserName = UpCall.SGLL.Data.LoginUser.Username,
                Parameters = this.textBoxParameters.Text,
                IntervalSec = interval,
            };
            Reset();
            StartMojoCall();
            if (this.checkBoxAllUsers.Checked)
            {
                MultipleUserCtl.AdvanceCall(this, args);
            }
        }

        private void StartMojoCall()
        {
            CallMojoOnce(args);
            if (args.Times > 1)
            {
                timer = new Timer();
                timer.Enabled = true;
                timer.Interval = args.IntervalSec;
                timer.Tick += new EventHandler(t_Tick);
                timer.Start();
            }
        }

        void t_Tick(object sender, EventArgs e)
        {
            CurTimes++;
            CallMojoOnce(args);

            if (CurTimes >= MaxTimes)
            {
                timer.Stop();
                timer.Dispose();
                timer = null;
            }
        }

        private void CallMojoOnce(AdvanceCallArgs args)
        {
            string url = args.Url;
            string paras = args.Parameters;

            this.textBoxResult.AppendText(DateTime.Now.ToString() + " 开始执行第" + CurTimes + "次执行......");
            textBoxResult.AppendText(Environment.NewLine);
            var result = UpCall.SGLL.Client.Post(url, paras, UpCall.LoginInfo);
            if (result.Item1)
            {
                this.textBoxResult.AppendText(result.Item2);
            }
            this.textBoxResult.AppendText(Environment.NewLine);
            this.textBoxResult.AppendText(Environment.NewLine);
            this.textBoxResult.AppendText(Environment.NewLine);
        }

        private void AdvanceCall_Load(object sender, EventArgs e)
        {

        }

        public void RegisterMultipleCall()
        {
            UpCall.SGLL.OnAdvanceCall += new EventHandler<AdvanceCallArgs>(SGLL_OnAdvanceCall);
        }
    }
}
