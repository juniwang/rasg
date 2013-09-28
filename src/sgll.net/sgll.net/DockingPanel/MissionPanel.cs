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

namespace sgll.net.DockingPanel
{
    public partial class MissionPanel : DockContent
    {
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }
        private MojoMissionScenario scenario = null;
        private MojoMissionTaskGroup group = null;

        public MissionPanel()
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

            if (UpCall.Data != null && UpCall.Data.MissionData != null)
            {
                var md = UpCall.Data.MissionData;
                this.labelScenario.Text = md.CurScenario == null ? "--" : md.CurScenario.Name;

                // show groups
                if (md.CurScenario != null && (scenario == null || scenario.ScenarioId != md.CurScenario.ScenarioId))
                {
                    listViewEx1.Items.Clear();
                    scenario = md.CurScenario;
                }
                if (md.TaskGroups != null)
                {
                    var gi = listViewEx1.Items.Count == 0;
                    for (int i = 0; i < md.TaskGroups.Count; i++)
                    {
                        var g = md.TaskGroups[i];
                        if (gi)
                        {
                            ListViewItem lvi = listViewEx1.Items.Add(g.Name);
                            lvi.SubItems.Add(g.Level.ToString());
                        }
                        else
                            listViewEx1.Items[i].SubItems[1].Text = g.Level.ToString();

                        if (md.CurTaskGroup != null && md.CurTaskGroup.TaskGroupId == g.TaskGroupId)
                        {
                            listViewEx1.Items[i].BackColor = Color.LightGreen;
                        }
                        else
                            listViewEx1.Items[i].BackColor = Color.White;
                    }
                }

                // show tasks
                if (md.CurTaskGroup != null && (group == null || group.TaskGroupId != md.CurTaskGroup.TaskGroupId))
                {
                    listViewEx2.Items.Clear();
                    group = md.CurTaskGroup;
                }
                if (md.Tasks != null)
                {
                    var ti = listViewEx2.Items.Count == 0;
                    for (int i = 0; i < md.Tasks.Count; i++)
                    {
                        var t = md.Tasks[i];
                        ListViewItem lvi = null;
                        if (ti)
                        {
                            lvi = listViewEx2.Items.Add(t.Name);
                            lvi.SubItems.Add(t.EP.ToString());
                            lvi.SubItems.Add("");
                            ProgressBar pb = new ProgressBar();
                            pb.Maximum = t.SumCount;
                            pb.Value = t.Count;
                            listViewEx2.AddEmbeddedControl(pb, 2, i);
                        }
                        else
                        {
                            lvi = listViewEx2.Items[i];
                            lvi.SubItems[1].Text = t.EP.ToString();
                            ProgressBar pb = (ProgressBar)listViewEx2.GetEmbeddedControl(2, i);
                            if (pb != null && pb.Value != t.Count)
                            {
                                pb.Maximum = t.SumCount;
                                pb.Value = t.Count;
                            }
                        }
                    }
                }
            }
        }

        private void MissionPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.MissionQueue;
            this.startStop1.StatusUpdate = ChangedType.Mission;
            this.startStop1.TextControl = this;
        }
    }
}
