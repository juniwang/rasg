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
        public MainFrame UpCall { get; set; }

        public ForceTasks()
        {
            InitializeComponent();
        }

        private void ListView_Refresh()
        { }

        private void ListView_ReBind()
        { }

        public void Display()
        {
            this.buttonStart.Enabled = true;
            this.buttonStop.Enabled = false;
            if (UpCall.Data.LoginUser.Features != null)
            {
                var feature = UpCall.Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == SGLLController.QueueGUID.ForceTaskQueue);
                if (feature != null && feature.Enabled == true)
                {
                    this.buttonStart.Enabled = false;
                    this.buttonStop.Enabled = true;
                }
            }

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
                    this.Text = "内政";

                    if (this.listViewEx1.Items.Count == 0)
                    {
                        for (int i = 0; i < UpCall.Data.ForceTasks.Tasks.Count; i++)
                        {
                            var task = UpCall.Data.ForceTasks.Tasks[i];
                            var lvi = listViewEx1.Items.Add(task.Name);
                            lvi.SubItems.Add("");
                            lvi.SubItems.Add(task.ColdDownText);
                            ProgressBar pb = new ProgressBar();
                            pb.Maximum = task.SumCount;
                            pb.Value = task.Count;
                            listViewEx1.AddEmbeddedControl(pb, 1, i);
                            if (task.UnlockLevel > force.ForceLevel)
                            {
                                lvi.SubItems[2].Text = "--:--:--";
                                lvi.BackColor = Color.LightGray;
                            }
                            else if (task.Count < task.SumCount)
                                lvi.BackColor = Color.White;
                            else
                            {
                                lvi.SubItems[2].Text = "--:--:--";
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
                            lvi.SubItems[2].Text = task.ColdDownText;
                            if (task.UnlockLevel > force.ForceLevel)
                            {
                                lvi.BackColor = Color.LightGray;
                                lvi.SubItems[2].Text = "--:--:--";
                            }
                            else if (task.Count < task.SumCount)
                                lvi.BackColor = Color.White;
                            else
                            {
                                lvi.SubItems[2].Text = "--:--:--"; 
                                lvi.BackColor = Color.LightGreen;
                            }
                        }
                    }

                    this.labelTip.Visible = (UpCall.Data.ForceTasks.HasRefresh == 1);
                }
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StartQueue(SGLLController.QueueGUID.ForceTaskQueue);
            var dic = new Dictionary<string, string>();
            dic.Add(SR.QueueParameterKeys.AutoAcceptRefresh, this.checkBoxRefresh.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceTaskQueue, dic);

            Display();
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StopQueue(SGLLController.QueueGUID.ForceTaskQueue);

            Display();
        }

        private void checkBoxRefresh_CheckedChanged(object sender, EventArgs e)
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.QueueParameterKeys.AutoAcceptRefresh, this.checkBoxRefresh.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceTaskQueue, dic);

            Display();
        }
    }
}
