﻿using System;
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
        public MainFrame UpCall { get; set; }

        public ForceBossPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.startStop1.Display();
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
                    this.labelAttackTimeout.Text = new TimeSpan(0, 0, battle.AttackTimeout).ToString();
                    this.labelBossTimeOut.Text = new TimeSpan(0, 0, battle.BossTimeout).ToString();
                    this.labelFree.Text = battle.AttackFree.ToString();
                    this.labelLeft.Text = battle.Left.ToString();
                }
            }
        }

        private void ForceBossPanel_Load(object sender, EventArgs e)
        {
            InitStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceBossQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceBoss;
            this.startStop1.TextControl = this;
        }

        private void checkBoxUse_CheckedChanged(object sender, EventArgs e)
        {

        }
    }
}
