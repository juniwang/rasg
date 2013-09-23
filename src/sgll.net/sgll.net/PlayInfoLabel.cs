using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entieies;
using sgll.net.Core;

namespace sgll.net
{
    public partial class PlayInfoLabel : UserControl
    {
        public SGLLData Data { get; set; }

        public PlayInfoLabel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            var player = Data.PlayerInfo;
            if (player != null)
            {
                this.labelNickname.Text = player.NickName;
                this.labelGrain.Text = "粮食：" + player.Grain;
                this.labelVM.Text = "银币：" + player.VM;
                this.labelRM.Text = "元宝：" + player.RM;
                this.labelEnergy.Text = string.Format("精力：{0}/{1}", player.EP, player.Energy);
                this.labelaExp.Text = string.Format("经验：{0}/{1}", player.Exp, player.LevelExp);
                this.labelStamima.Text = string.Format("体力：{0}/{1}", player.SP, player.Stamima);
                this.labelLevel.Text = "等级：" + player.Level;
                if (player.CardIndex != null)
                {
                    this.labelCard.Text = string.Format("卡片：{0}/{1}", player.CardIndex.CardCount, player.CardIndex.CardCapacity);
                }
            }
        }
    }
}
