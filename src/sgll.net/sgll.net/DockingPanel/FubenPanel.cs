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
using sgll.net.Core.Entities;

namespace sgll.net.DockingPanel
{
    public partial class FubenPanel : DockContent
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

        public FubenPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            DisplayStartStop();
            this.checkBoxBoss.Checked = bool.Parse(UpCall.LoginInfo.GetParameter(SGLLController.QueueGUID.FubenQueue, SR.ParaKey.AutoBossAward, "false"));

            //总览
            if (UpCall.Data.FubenData != null && UpCall.Data.FubenData.Fubens != null)
            {
                if (this.listViewEx1.Items.Count == 0)
                {
                    for (int i = 0; i < UpCall.Data.FubenData.Fubens.Count; i++)
                    {
                        var item = UpCall.Data.FubenData.Fubens[i];
                        var lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add(item.StatusDisplay);
                        lvi.SubItems.Add(item.CurrentGroup == null ? "" : item.CurrentGroup.Name);
                        lvi.SubItems.Add(item.ColdDownDisplay);
                        lvi.SubItems.Add(item.Award);
                        lvi.BackColor = item.StatusColor;
                    }
                }

                for (int i = 0; i < UpCall.Data.FubenData.Fubens.Count; i++)
                {
                    var lvi = listViewEx1.Items[i];
                    var item = UpCall.Data.FubenData.Fubens[i];
                    lvi.SubItems[1].Text = item.StatusDisplay;
                    lvi.SubItems[2].Text = item.CurrentGroup == null ? "" : item.CurrentGroup.Name;
                    lvi.SubItems[3].Text = item.ColdDownDisplay;
                    lvi.SubItems[4].Text = item.Award;
                    lvi.BackColor = item.StatusColor;
                }

                //details
                foreach (var fb in UpCall.Data.FubenData.Fubens)
                {
                    if (fb.Status == 1)
                        ShowFubenDetail(fb);
                    else
                        HideFubenDetail(fb);
                }
            }
        }

        private void HideFubenDetail(MojoFuben fuben)
        {
            TabPage tp = null;
            for (int i = 1; i < tabControl1.TabCount; i++)
            {
                if (!(tabControl1.TabPages[i].Controls[0] is FubenStatus))
                    continue;
                FubenStatus mf = tabControl1.TabPages[i].Controls[0] as FubenStatus;
                if (mf.Fuben.Name == fuben.Name)
                {
                    tp = tabControl1.TabPages[i];
                    break;
                }
            }
            if (tp != null)
            {
                tabControl1.TabPages.Remove(tp);
            }
        }

        private void ShowFubenDetail(MojoFuben fuben)
        {
            // check if repeat login
            for (int i = 1; i < tabControl1.TabCount; i++)
            {
                if (!(tabControl1.TabPages[i].Controls[0] is FubenStatus))
                    continue;
                FubenStatus mf = tabControl1.TabPages[i].Controls[0] as FubenStatus;
                if (mf.Fuben.Name == fuben.Name)
                {
                    mf.Fuben = fuben;
                    mf.Display();
                    return;
                }
            }

            TabPage tp = new TabPage();
            tp.Text = fuben.Name;
            FubenStatus uc1 = new FubenStatus(fuben);
            uc1.Dock = DockStyle.Fill;
            tp.Controls.Add(uc1);
            tabControl1.TabPages.Add(tp);
            uc1.Fuben = fuben;
            uc1.Display();
        }

        private void FubenPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.FubenQueue;
            this.startStop1.StatusUpdate = ChangedType.Fuben;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                ResetParameters();
            };
        }

        private void ResetParameters()
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.ParaKey.AutoBossAward, this.checkBoxBoss.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.FubenQueue, dic);
        }

        private void checkBoxBoss_CheckedChanged(object sender, EventArgs e)
        {
            ResetParameters();
            Display();
        }
    }
}
