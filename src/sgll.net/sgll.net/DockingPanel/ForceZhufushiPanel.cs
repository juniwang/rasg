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
            this.startStop1.Display();
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
            InitStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceZhufushiQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceZhufushi;
        }
    }
}
