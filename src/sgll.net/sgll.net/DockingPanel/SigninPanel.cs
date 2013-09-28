using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using sgll.net.Core;
using sgll.net.Core.Entieies;
using sgll.net.Core.Queue;

namespace sgll.net.DockingPanel
{
    public partial class SigninPanel : DockContent
    {
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        private void DisplayStartStop()
        {
            if (!startStopInited)
            {
                InitStartStop();
                startStopInited = true;
            }
            this.startStop1.Display();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.SigninQueue;
            this.startStop1.StatusUpdate = ChangedType.SignIn;
            this.startStop1.TextControl = this;
        }

        public SigninPanel()
        {
            InitializeComponent();
        }

        private void SigninPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        public void Display()
        {
            DisplayStartStop();
            var signin = UpCall.SGLL.Data.SignInData;
            if (signin != null)
            {
                switch (signin.Status)
                {
                    case SignStatus.NeedSignin:
                        this.labelStatus.Text = "未签到";
                        break;
                    case SignStatus.Completed:
                        this.labelStatus.Text = "已签到";
                        break;
                    default:
                        this.labelStatus.Text = "未知";
                        break;
                }

                if (!string.IsNullOrWhiteSpace(signin.AwardToday))
                {
                    this.labelAward.Text = signin.AwardToday;
                    this.labelAward.Visible = true;
                }
                else
                {
                    this.labelAward.Visible = false;
                }

                this.labelCD.Text = signin.ColdDownDisplay;
                this.buttonSignin.Enabled = signin.Status == SignStatus.NeedSignin;
            }
        }

        private void buttonSignin_Click(object sender, EventArgs e)
        {
            var queue = UpCall.SGLL.QueryQueue(SGLLController.QueueGUID.SigninQueue) as SigninQueue;
            if (queue != null)
                queue.SignIn();
        }
    }
}
