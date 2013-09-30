using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core;

namespace sgll.net
{
    public partial class MutipleControlPanel : Form
    {
        public MutipleControlPanel()
        {
            InitializeComponent();
            InitControls();
        }

        private void InitControls()
        {
            checkedListBox1.Items.Clear();
            foreach (var key in SGLLController.QueueShowItems.Keys)
            {
                checkedListBox1.Items.Add(key);
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            foreach (string item in checkedListBox1.CheckedItems)
            {
                MultipleUserCtl.StartQueueForAllLogonUsers(this, SGLLController.QueueShowItems[item]);
            }
            DialogResult = System.Windows.Forms.DialogResult.OK;
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            foreach (string item in checkedListBox1.CheckedItems)
            {
                MultipleUserCtl.StopQueueForAllLogonUsers(this, SGLLController.QueueShowItems[item]);
            }
            DialogResult = System.Windows.Forms.DialogResult.OK;
        }
    }
}
