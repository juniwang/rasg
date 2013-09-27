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
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        public ForceZhufushiPanel()
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
            if (UpCall.Data.ForceZhufushi != null)
            {
                var t = UpCall.Data.ForceZhufushi;
                var time2 = t.LastSyncTime.AddSeconds(t.ColdDown);
                int cd2 = time2 < DateTime.Now ? 0 : (int)(time2 - DateTime.Now).TotalSeconds;
                this.labelColdDown.Text = new TimeSpan(0, 0, cd2).ToString();
            }
        }
        
        private void ForceZhufushiPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceZhufushiQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceZhufushi;
        }
    }
}
