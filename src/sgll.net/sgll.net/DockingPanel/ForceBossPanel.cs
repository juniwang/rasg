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

namespace sgll.net.DockingPanel
{
    public partial class ForceBossPanel : DockContent
    {
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        public ForceBossPanel()
        {
            InitializeComponent();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceBossQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceBoss;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                SaveParameters();
            };
        }

        private void DisplayStartStop()
        {
            if (!startStopInited)
            {
                InitStartStop();
                startStopInited = true;
            }
            this.startStop1.Display();
        }

        public void Display()
        {
            DisplayStartStop();
            this.checkBoxUse.Checked = bool.Parse(UpCall.LoginInfo.GetParameter(SGLLController.QueueGUID.ForceBossQueue, SR.ParaKey.AutoForceBossSP, "true"));

            if (UpCall.Data.ForceBoss == null || !UpCall.Data.ForceBoss.IsInChallange)
            {
                this.groupBox1.Visible = true;
                this.groupBox1.Dock = DockStyle.Fill;
                this.groupBox2.Visible = false;
            }
            else
            {
                this.groupBox1.Visible = false;
                this.groupBox2.Visible = true;
                this.groupBox2.Dock = DockStyle.Fill;

                if (UpCall.Data.ForceBoss.Battle != null)
                {
                    var battle = UpCall.Data.ForceBoss.Battle;
                    int interval = (int)(DateTime.Now - battle.LastAttackTime).TotalSeconds;
                    int a_t = battle.AttackTimeout <= interval ? 0 : battle.AttackTimeout - interval;
                    int b_t = battle.BossTimeout <= interval ? 0 : battle.BossTimeout - interval;
                    this.labelAttackTimeout.Text = new TimeSpan(0, 0, a_t).ToString();
                    this.labelBossTimeOut.Text = new TimeSpan(0, 0, b_t).ToString();
                    this.labelFree.Text = battle.AttackFree.ToString();
                    this.labelLeft.Text = battle.Left.ToString();
                }

                labelTiliLeft.Text = "";
                if (UpCall.Data.Daoju != null && UpCall.Data.Daoju.Items != null)
                {
                    var tili = UpCall.Data.Daoju.Items.FirstOrDefault(p => p.Name == SR.Daoju.TiliBig);
                    if (tili != null)
                    {
                        labelTiliLeft.Text = string.Format("【{0}数量：{1}】", SR.Daoju.TiliBig, tili.Count);
                    }
                }
            }
        }

        private void ForceBossPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void SaveParameters()
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.ParaKey.AutoForceBossSP, this.checkBoxUse.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceBossQueue, dic);
        }

        private void checkBoxUse_CheckedChanged(object sender, EventArgs e)
        {
            SaveParameters();
            Display();
        }
    }
}
