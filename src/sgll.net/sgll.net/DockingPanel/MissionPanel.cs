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
    public partial class MissionPanel : DockContent
    {
        public MainFrame UpCall { get; set; }

        public MissionPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.startStop1.Display();


        }

        private void MissionPanel_Load(object sender, EventArgs e)
        {
            InitStartStop();
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
