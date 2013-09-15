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
    public partial class CollectPanel : DockContent
    {
        public MainFrame UpCall { get; set; }

        public CollectPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.startStop1.Display();
            if (UpCall.Data.CollectData != null && UpCall.Data.CollectData.Items != null)
            {
                if (this.listViewEx1.Items.Count == 0)
                {
                    for (int i = 0; i < UpCall.Data.CollectData.Items.Count; i++)
                    {
                        var item = UpCall.Data.CollectData.Items[i];
                        var lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add(item.Count.ToString());
                        lvi.SubItems.Add("");
                        lvi.SubItems.Add("");
                    }
                }

                for (int i = 0; i < UpCall.Data.CollectData.Items.Count; i++)
                {
                    var lvi = listViewEx1.Items[i];
                    var item = UpCall.Data.CollectData.Items[i];
                    lvi.SubItems[1].Text = item.Count.ToString();
                    if (item.IsCollecting)
                    {
                        lvi.SubItems[2].Text = "合成中";
                        int ts = (int)(item.LastSyncTime.AddSeconds(item.AwayTime) - DateTime.Now).TotalSeconds;
                        if (ts < 0) ts = 0;
                        lvi.SubItems[3].Text = new TimeSpan(0, 0, ts).ToString();
                        lvi.SubItems[2].ForeColor = Color.LightBlue;
                        lvi.SubItems[3].ForeColor = Color.LightBlue;
                    }
                    else if (!item.CanStartCollect)
                    {
                        lvi.SubItems[2].Text = "碎片不足";
                        lvi.SubItems[3].Text = "";
                        lvi.SubItems[2].ForeColor = Color.Red;
                        lvi.SubItems[3].ForeColor = Color.Red;
                    }
                    else
                    {
                        lvi.SubItems[2].Text = "";
                        lvi.SubItems[3].Text = "";
                        lvi.SubItems[2].ForeColor = Color.Black;
                        lvi.SubItems[3].ForeColor = Color.Black;
                    }
                }
            }
        }

        private void CollectPanel_Load(object sender, EventArgs e)
        {
            InitStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.CollectQueue;
            this.startStop1.StatusUpdate = ChangedType.Collect;
            this.startStop1.TextControl = this;
        }
    }
}
