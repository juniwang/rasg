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
    public partial class PlayerStatus : DockContent
    {
        public MainFrame UpCall { get; set; }

        public PlayerStatus()
        {
            InitializeComponent();
        }

        private void PlayerStatus_Load(object sender, EventArgs e)
        {
            
        }

        public void Display()
        {
            this.playInfoLabel1.PlayerInfo = UpCall.Data.PlayerInfo;
            this.playInfoLabel1.Display();
        }
    }
}
