using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core;

namespace sgll.net
{
    public partial class StartStop : UserControl
    {
        public StartStop()
        {
            InitializeComponent();
        }

        public void Display()
        {
            if (SGLL != null && SGLL.Data != null && SGLL.Data.LoginUser != null && SGLL.Data.LoginUser.Features != null)
            {
                var feature = SGLL.Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == Qid);
                if (feature != null)
                {
                    var tc = this.TextControl == null ? this.Parent : this.TextControl;
                    tc.Text = feature.Enabled ? SGLLController.QueueTitles[Qid] + "[自动中]" : SGLLController.QueueTitles[Qid];
                    buttonStart.Enabled = !feature.Enabled;
                    buttonStop.Enabled = feature.Enabled;
                }
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            SGLL.StartQueue(Qid);
            buttonStart.Enabled = false;
            buttonStop.Enabled = true;
            SGLL.CallStatusUpdate(this, StatusUpdate);
            if (OnStart != null)
                OnStart();
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            SGLL.StopQueue(Qid);
            buttonStart.Enabled = true;
            buttonStop.Enabled = false;
            SGLL.CallStatusUpdate(this, StatusUpdate);
            if (OnStop != null)
            {
                OnStop();
            }
        }

        public Action OnStart { get; set; }
        public Action OnStop { get; set; }
        public int Qid { get; set; }
        public SGLLController SGLL { get; set; }
        public Control TextControl { get; set; }
        public ChangedType StatusUpdate { get; set; }
    }
}
