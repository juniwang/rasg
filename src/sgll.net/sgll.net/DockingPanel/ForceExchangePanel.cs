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
    public partial class ForceExchangePanel : DockContent
    {
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        public ForceExchangePanel()
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
            if (UpCall.Data.ForceExchange != null && UpCall.Data.ForceExchange.Items != null)
            {
                if (UpCall.Data.ForceExchange.Items.Count != listViewEx1.Items.Count)
                    listViewEx1.Items.Clear();

                if (this.listViewEx1.Items.Count == 0)
                {
                    foreach (var item in UpCall.Data.ForceExchange.Items)
                    {
                        var lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add(item.Grain.ToString());
                        lvi.SubItems.Add(item.ColdDownDisplay);
                        lvi.SubItems.Add(item.Award);
                    }
                }
                else
                {
                    for (int i = 0; i < listViewEx1.Items.Count; i++)
                    {
                        var item = UpCall.Data.ForceExchange.Items[i];
                        var lvi = listViewEx1.Items[i];
                        lvi.Text = item.Name;
                        lvi.SubItems[1].Text = item.Grain.ToString();
                        lvi.SubItems[2].Text = item.ColdDownDisplay;
                        lvi.SubItems[3].Text = item.Award;
                    }
                }
            }
        }

        private void ForceZhufushiPanel_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.ForceExchangeQueue;
            this.startStop1.StatusUpdate = ChangedType.ForceExchange;
            this.startStop1.TextControl = this;
        }
    }
}
