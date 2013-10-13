using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using sgll.net.Core.Bridge;
using Newtonsoft.Json.Linq;

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
            this.playInfoLabel1.Data = UpCall.Data;
            this.playInfoLabel1.Display();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //var client = (IPadBridge)UpCall.SGLL.Client;
            //var ck = UpCall.Data.LoginUser.Cookie;
            //var resp = client.Get("http://wsa.sg21.redatoms.com/mojo/ipad/default/selectPlayer?from=settings", "",
            //     UpCall.SGLL.Data.LoginUser.Cookie);
            //if (resp.Item1)
            //{
            //    var r2 = client.Post("/player/accessToken", "", ck, "");
            //    if (r2.Item1)
            //    {
            //        dynamic d1 = JObject.Parse(r2.Item2);
            //        string token1 = d1.data.accessToken;
            //        //var r3 = client.PostWithAT("/system/switchAccount", "playerId=1916726&accessToken=" + token1, ck, token1);
            //        var token2 = "";
            //        var r3 = client.SwitchAccount(ck, token1, out token2);
            //        if (r3.Item1)
            //        {
            //            var r4 = client.Post("/player/profile", "", ck, "");
            //            if (r4.Item1)
            //                MessageBox.Show(r4.Item2);
            //        }
            //    }
            //}
        }
    }
}
