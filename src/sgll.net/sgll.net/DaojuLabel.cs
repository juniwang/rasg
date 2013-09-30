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
    public partial class DaojuLabel : UserControl
    {
        public SGLLData Data { get; set; }
        DateTime _nextRefreshTime = DateTime.Now;

        public DaojuLabel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            if (_nextRefreshTime < DateTime.Now)
            {
                listViewEx1.Items.Clear();
                _nextRefreshTime = DateTime.Now.AddHours(1);
            }

            if (Data.Daoju != null && Data.Daoju.Items != null)
            {
                if (this.listViewEx1.Items.Count == 0)
                {
                    for (int i = 0; i < Data.Daoju.Items.Count; i += 3)
                    {
                        var d0 = Data.Daoju.Items[i];
                        var d1 = i + 1 < Data.Daoju.Items.Count ? Data.Daoju.Items[i + 1] : null;
                        var d2 = i + 2 < Data.Daoju.Items.Count ? Data.Daoju.Items[i + 2] : null;
                        var lvi = this.listViewEx1.Items.Add(d0.Name);
                        lvi.SubItems.AddRange(new string[] { d0.Count.ToString(), d1 == null ? "" : d1.Name, d1 == null ? "" : d1.Count.ToString(), d2 == null ? "" : d2.Name, d2 == null ? "" : d2.Count.ToString() });
                    }
                }
                else
                {
                    for (int i = 0; i < listViewEx1.Items.Count; i++)
                    {
                        var lvi = listViewEx1.Items[i];
                        for (int sub = 0; sub < 3; sub++)
                        {
                            var name = lvi.SubItems[sub * 2].Text;
                            if (!string.IsNullOrWhiteSpace(name))
                            {
                                var di = Data.Daoju.Items.SingleOrDefault(p => p.Name == name);
                                if (di != null)
                                {
                                    lvi.SubItems[2 * sub + 1].Text = di.Count.ToString();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
