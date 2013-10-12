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
    public partial class FubenGroupStatus : UserControl
    {
        public MojoFuben Fuben { get; set; }

        public FubenGroupStatus()
        {
            InitializeComponent();
        }

        public void Display()
        {
            if (Fuben != null && Fuben.Tasks != null)
            {
                if (this.listViewEx1.Items.Count == 0)
                {
                    for (int i = 0; i < Fuben.Tasks.Count; i++)
                    {
                        var item = Fuben.Tasks[i];
                        var lvi = listViewEx1.Items.Add(item.Name);
                        lvi.SubItems.Add("");
                        lvi.SubItems.Add(item.ColdDownDisplay);

                        ProgressBar pb = new ProgressBar();
                        pb.Maximum = item.SumCount;
                        pb.Value = item.Count;
                        listViewEx1.AddEmbeddedControl(pb, 1, i);
                    }
                }
                else
                {
                    for (int i = 0; i < Fuben.Tasks.Count; i++)
                    {
                        var item = Fuben.Tasks[i];
                        var lvi = listViewEx1.Items[i];
                        lvi.SubItems[0].Text = item.Name;
                        lvi.SubItems[2].Text = item.ColdDownDisplay;

                        ProgressBar pb = (ProgressBar)listViewEx1.GetEmbeddedControl(1, i);
                        if (pb.Value != item.Count) pb.Value = item.Count;
                    }
                }
            }
        }
    }
}
