using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entieies;

namespace sgll.net
{
    public partial class PlayInfoLabel : UserControl
    {
        public MojoPlayer PlayerInfo { get; set; }

        public PlayInfoLabel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            if (PlayerInfo == null)
            {
                this.labelNickname.Text = "----";
                this.labelGrain.Text = "粮食：--";
                this.labelVM.Text = "银币：--";
                this.labelRM.Text = "元宝：--";
                this.labelEnergy.Text = "精力：--/--";
                this.labelaExp.Text = "经验：--/--";
                this.labelStamima.Text = "体力：--/--";
                this.labelLevel.Text = "等级：--";
            }
            else
            {
                this.labelNickname.Text = PlayerInfo.NickName;
                this.labelGrain.Text = "粮食：" + PlayerInfo.Grain;
                this.labelVM.Text = "银币：" + PlayerInfo.VM;
                this.labelRM.Text = "元宝：" + PlayerInfo.RM;
                this.labelEnergy.Text = string.Format("精力：{0}/{1}", PlayerInfo.EP, PlayerInfo.Energy);
                this.labelaExp.Text = string.Format("经验：{0}/{1}", PlayerInfo.Exp, PlayerInfo.LevelExp);
                this.labelStamima.Text = string.Format("体力：{0}/{1}", PlayerInfo.SP, PlayerInfo.Stamima);
                this.labelLevel.Text = "等级：" + PlayerInfo.Level;
            }
        }
    }
}
