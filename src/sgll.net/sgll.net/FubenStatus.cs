using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entities;

namespace sgll.net
{
    public partial class FubenStatus : UserControl
    {
        public MojoFuben Fuben { get; set; }

        public FubenStatus(MojoFuben fuben)
        {
            Fuben = fuben;
            InitializeComponent();
            this.fubenGroupStatus1.Fuben = fuben;
        }

        public void Display()
        {
            if (Fuben != null && Fuben.Groups != null && Fuben.CurrentGroup != null)
            {
                this.fubenGroupStatus1.Fuben = Fuben;
                this.fubenGroupStatus1.Display();

                bool init = this.listViewEx1.Items.Count == 0;
                for (int i = 0; i < Fuben.Groups.Count; i++)
                {
                    var item = Fuben.Groups[i];
                    ListViewItem lvi = null;
                    if (init)
                    {
                        lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add("");
                        lvi.SubItems.Add("");
                    }
                    else lvi = listViewEx1.Items[i];

                    if (item.Order == Fuben.CurrentGroup.Order)
                    {
                        lvi.BackColor = Color.LightYellow;
                        lvi.SubItems[1].Text = "闯关中";
                    }
                    else if (item.Order < Fuben.CurrentGroup.Order)
                    {
                        lvi.BackColor = Color.LightGreen;
                        lvi.SubItems[1].Text = "已完成";
                    }
                    else
                    {
                        lvi.BackColor = Color.Gray;
                        lvi.SubItems[1].Text = "未解锁";
                    }
                }
            }
        }
    }
}
