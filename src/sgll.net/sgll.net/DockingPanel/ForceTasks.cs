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
    public partial class ForceTasks : DockContent
    {
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        public ForceTasks()
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

        public void Display()
        {
            DisplayStartStop();
            this.checkBoxRefresh.Checked = bool.Parse(UpCall.LoginInfo.GetParameter(SGLLController.QueueGUID.ForceTaskQueue, SR.ParaKey.AutoAcceptRefresh, "true"));

            var force = UpCall.Data.ForceTasks;
            if (force != null)
            {
                if (force.NoForce)
                {
                    this.Enabled = false;
                    this.Text = "未加入任何势力";
                    this.listViewEx1.Items.Clear();
                }
                else if (force.Tasks != null)
                {
                    this.Enabled = true;

                    if (this.listViewEx1.Items.Count == 0)
                    {
                        for (int i = 0; i < UpCall.Data.ForceTasks.Tasks.Count; i++)
                        {
                            var task = UpCall.Data.ForceTasks.Tasks[i];
                            var lvi = listViewEx1.Items.Add(task.Name);
                            lvi.SubItems.Add("");
                            lvi.SubItems.Add(task.ColdDownDisplay);
                            ProgressBar pb = new ProgressBar();
                            pb.Maximum = task.SumCount;
                            pb.Value = task.Count;
                            listViewEx1.AddEmbeddedControl(pb, 1, i);
                            if (task.UnlockLevel > force.ForceLevel)
                            {
                                lvi.SubItems[2].Text = SR.Display.ColdDownDisable;
                                lvi.BackColor = Color.LightGray;
                            }
                            else if (task.Count < task.SumCount)
                                lvi.BackColor = Color.White;
                            else
                            {
                                lvi.SubItems[2].Text = SR.Display.ColdDownDisable;
                                lvi.BackColor = Color.LightGreen;
                            }
                        }
                    }
                    else
                    {
                        for (int i = 0; i < UpCall.Data.ForceTasks.Tasks.Count; i++)
                        {
                            var task = UpCall.Data.ForceTasks.Tasks[i];
                            ProgressBar pb = (ProgressBar)listViewEx1.GetEmbeddedControl(1, i);
                            if (pb.Value != task.Count)
                                pb.Value = task.Count;
                            var lvi = listViewEx1.Items[i];
                            lvi.SubItems[2].Text = task.ColdDownDisplay;
                            if (task.UnlockLevel > force.ForceLevel)
                            {
                                lvi.BackColor = Color.LightGray;
                                lvi.SubItems[2].Text = SR.Display.ColdDownDisable;
                            }
                            else if (task.Count < task.SumCount)
                                lvi.BackColor = Color.White;
                            else
                            {
                                lvi.SubItems[2].Text = SR.Display.ColdDownDisable;
                                lvi.BackColor = Color.LightGreen;
                            }
                        }
                    }

                    this.labelTip.Visible = (UpCall.Data.ForceTasks.HasRefresh == 1);
                }
            }
        }

        private void checkBoxRefresh_CheckedChanged(object sender, EventArgs e)
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.ParaKey.AutoAcceptRefresh, this.checkBoxRefresh.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceTaskQueue, dic);

            Display();
        }

        private void ForceTasks_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceTaskQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceTask;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                var dic = new Dictionary<string, string>();
                dic.Add(SR.ParaKey.AutoAcceptRefresh, this.checkBoxRefresh.Checked.ToString().ToLower());
                UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceTaskQueue, dic);
            };
        }
    }
}
