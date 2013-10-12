using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using sgll.net.Core.Entities;
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
                    for (int i = 0; i < UpCall.Data.ForceExchange.Items.Count; i++)
                    {
                        var item = UpCall.Data.ForceExchange.Items[i];
                        var lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add("");
                        lvi.SubItems.Add(item.Grain.ToString());
                        lvi.SubItems.Add(item.ColdDownDisplay);
                        lvi.SubItems.Add(item.Award);
                        lvi.BackColor = item.Locked ? Color.LightGray : Color.White;

                        CheckBox cb = new CheckBox();
                        cb.Text = "";
                        cb.Tag = item.GetKey();
                        cb.Checked = item.IsChecked(UpCall.Data.LoginUser);
                        cb.Enabled = !item.Locked;
                        listViewEx1.AddEmbeddedControl(cb, 1, i);
                        cb.CheckStateChanged += new EventHandler(cb_CheckStateChanged);
                    }
                }
                else
                {
                    for (int i = 0; i < listViewEx1.Items.Count; i++)
                    {
                        var item = UpCall.Data.ForceExchange.Items[i];
                        var lvi = listViewEx1.Items[i];
                        lvi.Text = item.Name;
                        lvi.SubItems[2].Text = item.Grain.ToString();
                        lvi.SubItems[3].Text = item.ColdDownDisplay;
                        lvi.SubItems[4].Text = item.Award;

                        CheckBox cb = (CheckBox)listViewEx1.GetEmbeddedControl(1, i);
                        cb.Checked = item.IsChecked(UpCall.Data.LoginUser);
                        cb.Enabled = !item.Locked;
                        lvi.BackColor = item.Locked ? Color.LightGray : Color.White;
                    }
                }
            }
        }

        void cb_CheckStateChanged(object sender, EventArgs e)
        {
            SaveParameters();
        }

        private void SaveParameters()
        {
            var dic = new Dictionary<string, string>();
            for (int i = 0; i < listViewEx1.Items.Count; i++)
            {
                CheckBox cb = (CheckBox)listViewEx1.GetEmbeddedControl(1, i);
                dic.Add((string)cb.Tag, cb.Checked.ToString().ToLower());
            }

            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.ForceExchangeQueue, dic);

            Display();
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
            this.startStop1.OnStart = () => SaveParameters();
        }
    }
}
