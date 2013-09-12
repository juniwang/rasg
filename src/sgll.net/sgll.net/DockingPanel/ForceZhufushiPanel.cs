using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using sgll.net.Core.Entieies;
using sgll.net.Core;

namespace sgll.net.DockingPanel
{
    public partial class ForceZhufushiPanel : DockContent
    {
        public MainFrame UpCall { get; set; }

        public ForceZhufushiPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.buttonStart.Enabled = true;
            this.buttonStop.Enabled = false;
            if (UpCall.Data.LoginUser.Features != null)
            {
                var feature = UpCall.Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == SGLLController.QueueGUID.ForceZhufushiQueue);
                if (feature != null && feature.Enabled == true)
                {
                    this.buttonStart.Enabled = false;
                    this.buttonStop.Enabled = true;
                    this.Text = feature.Enabled ? "祝福石兑换[自动中]" : "祝福石兑换";
                }
            }

            if (UpCall.Data.ForceZhufushi != null)
            {
                var t = UpCall.Data.ForceZhufushi;
                var time2 = t.LastSyncTime.AddSeconds(t.ColdDown);
                int cd2 = time2 < DateTime.Now ? 0 : (int)(time2 - DateTime.Now).TotalSeconds;
                this.labelColdDown.Text = new TimeSpan(0, 0, cd2).ToString();
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StartQueue(SGLLController.QueueGUID.ForceZhufushiQueue);
            Display();
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StopQueue(SGLLController.QueueGUID.ForceZhufushiQueue);
            Display();
        }
    }
}
