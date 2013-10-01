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
    public partial class MoneyMonitorPanel : DockContent
    {
        private bool startStopInited = false;
        private bool firstLoad = true;
        public MainFrame UpCall { get; set; }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = SGLLController.QueueGUID.MoneyMonitorQueue;
            this.startStop1.StatusUpdate = ChangedType.MoneyMonitor;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                SaveParameters();
                RefreshParas();
            };
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

        private void SaveParameters()
        {
            var dic = new Dictionary<string, string>();
            dic.Add(SR.ParaKey.MoneyAddItem, this.comboBoxAddMoney.SelectedItem.ToString());
            dic.Add(SR.ParaKey.MoneySubItem, this.comboBoxSubMoney.SelectedItem.ToString());

            int line = 0;
            if (!int.TryParse(this.textBoxAddLine.Text, out line) || line <= 0)
            {
                MessageBox.Show("数字格式非法", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            dic.Add(SR.ParaKey.MoneyAddLine, line.ToString());

            if (!int.TryParse(this.textBoxSubLine.Text, out line) || line <= 0)
            {
                MessageBox.Show("数字格式非法", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            dic.Add(SR.ParaKey.MoneySubLine, line.ToString());

            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.MoneyMonitorQueue, dic);
        }

        public MoneyMonitorPanel()
        {
            InitializeComponent();
        }

        private void buttonSetPara_Click(object sender, EventArgs e)
        {
            SaveParameters();
            RefreshParas();
        }

        public void Display()
        {
            DisplayStartStop();
            if (firstLoad)
            {
                RefreshParas();
                firstLoad = false;
            }
        }

        private void RefreshParas()
        {
            var feature = UpCall.Data.LoginUser.GetFeature(SGLLController.QueueGUID.MoneyMonitorQueue);
            if (feature != null && feature.Parameters != null)
            {
                if (feature.Parameters.ContainsKey(SR.ParaKey.MoneyAddLine))
                    this.textBoxAddLine.Text = feature.Parameters[SR.ParaKey.MoneyAddLine];

                if (feature.Parameters.ContainsKey(SR.ParaKey.MoneySubLine))
                    this.textBoxSubLine.Text = feature.Parameters[SR.ParaKey.MoneySubLine];

                if (feature.Parameters.ContainsKey(SR.ParaKey.MoneyAddItem))
                    this.comboBoxAddMoney.SelectedItem = feature.Parameters[SR.ParaKey.MoneyAddItem];

                if (feature.Parameters.ContainsKey(SR.ParaKey.MoneySubItem))
                    this.comboBoxSubMoney.SelectedItem = feature.Parameters[SR.ParaKey.MoneySubItem];

            }
        }
    }
}
