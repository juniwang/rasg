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
    public partial class ActivityPanel : DockContent
    {
        private bool startStopInited = false;
        private bool firstLoad = true;
        private DateTime refreshTime = DateTime.Now;
        public MainFrame UpCall { get; set; }

        public ActivityPanel()
        {
            InitializeComponent();
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

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ActivityQueue;
            this.startStop1.StatusUpdate = ChangedType.Activity;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                SaveParameters();
                Display();
            };
        }

        private void SaveParameters()
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.ParaKey.ActivityAutoJM, this.checkBoxBuyJM.Checked.ToString().ToLower());
            dic.Add(SR.ParaKey.ActivityAutoShu, this.checkBoxEveryDay.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ActivityQueue, dic);
        }

        private void checkBoxBuyJM_CheckedChanged(object sender, EventArgs e)
        {
            SaveParameters();
        }

        private void checkBoxEveryDay_CheckedChanged(object sender, EventArgs e)
        {
            SaveParameters();
        }

        public void Display()
        {
            DisplayStartStop();
            if (firstLoad)
            {
                this.checkBoxBuyJM.Checked = bool.Parse(UpCall.LoginInfo.GetParameter(SGLLController.QueueGUID.ActivityQueue, SR.ParaKey.ActivityAutoJM, "true"));
                this.checkBoxEveryDay.Checked = bool.Parse(UpCall.LoginInfo.GetParameter(SGLLController.QueueGUID.ActivityQueue, SR.ParaKey.ActivityAutoShu, "false"));
                firstLoad = false;
            }
            var activity = UpCall.Data.ActivityData;
            if (activity != null && activity.Activities != null)
            {
                if (activity.Activities.Count != listViewEx1.Items.Count || DateTime.Now > refreshTime)
                {
                    listViewEx1.Items.Clear();
                    refreshTime = DateTime.Now.AddHours(1);
                }

                if (listViewEx1.Items.Count == 0)
                {
                    foreach (var ac in activity.Activities)
                    {
                        var lvi = listViewEx1.Items.Add(ac.Name);
                        lvi.Tag = ac.Id;
                        lvi.SubItems.Add(ac.AwardName);
                        lvi.SubItems.Add(ac.StatusDisplay);
                        lvi.BackColor = ac.BackColor;
                        lvi.SubItems.Add(ac.CDDisplay);
                        lvi.SubItems.Add(ac.AwardGot);
                    }
                }
                else
                {
                    for (int i = 0; i < listViewEx1.Items.Count; i++)
                    {
                        var lvi = listViewEx1.Items[i];
                        string id = (string)lvi.Tag;
                        var ac = activity.Activities.FirstOrDefault(p => p.Id == id);
                        if (ac != null)
                        {
                            lvi.SubItems[2].Text = ac.StatusDisplay;
                            lvi.SubItems[3].Text = ac.CDDisplay;
                            lvi.SubItems[4].Text = ac.AwardGot;
                            lvi.BackColor = ac.BackColor;
                        }
                    }
                }
            }
        }
    }
}
