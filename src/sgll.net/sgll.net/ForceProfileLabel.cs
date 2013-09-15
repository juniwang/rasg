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
    public partial class ForceProfileLabel : UserControl
    {
        public MojoForceInfo ForceProfile { get; set; }

        public ForceProfileLabel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            if (ForceProfile != null)
            {
                this.labelName.Text = ForceProfile.Name;
                this.labelLevel.Text = "等级：" + ForceProfile.Level;
                this.labelGrain.Text = "粮食：" + ForceProfile.Grain;
                this.labelGrainProtected.Text = "保护粮食：" + ForceProfile.GrainProtected;
                this.labelMember.Text = string.Format("会员：{0}/{1}", ForceProfile.MemberNum, ForceProfile.MemberNumLimit);
                this.labelaChallange.Text = string.Format("挑战书：{0}/{1}", ForceProfile.Challenge, ForceProfile.ChallengeLimit);
                this.labelOwner.Text = "势力主：" + ForceProfile.OwnerName;
                this.labelViceOwner.Text = "副势力主：" + ForceProfile.ViceOwnerName;
            }
        }
    }
}
