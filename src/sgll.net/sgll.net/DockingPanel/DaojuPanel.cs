using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;

namespace sgll.net.DockingPanel
{
    public partial class DaojuPanel : DockContent
    {
        public MainFrame UpCall { get; set; }

        public DaojuPanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.daojuLabel1.Data = UpCall.Data;
            this.daojuLabel1.Display();
        }
    }
}
