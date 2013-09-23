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
    public partial class ForceProfilePanel : DockContent
    {
        public MainFrame UpCall { get; set; }

        public ForceProfilePanel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            this.forceProfileLabel1.Data = UpCall.Data;
            this.forceProfileLabel1.Display();
        }
    }
}
