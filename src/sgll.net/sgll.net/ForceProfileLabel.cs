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
    public partial class ForceProfileLabel : UserControl
    {
        public SGLLData Data { get; set; }

        public ForceProfileLabel()
        {
            InitializeComponent();
        }

        public void Display()
        {
            var forceProfile = Data.ForceProfile;
            if (forceProfile != null)
            {
                this.labelName.Text = forceProfile.Name;
                this.labelLevel.Text = "等级：" + forceProfile.Level;
                this.labelGrain.Text = "粮食：" + forceProfile.Grain;
                this.labelGrainProtected.Text = "保底粮：" + forceProfile.GrainProtected;
                this.labelMember.Text = string.Format("会员：{0}/{1}", forceProfile.MemberNum, forceProfile.MemberNumLimit);
                this.labelaChallange.Text = string.Format("挑战书：{0}/{1}", forceProfile.Challenge, forceProfile.ChallengeLimit);
                this.labelOwner.Text = "势力主：" + forceProfile.OwnerName;
                this.labelViceOwner.Text = "副势力主：" + forceProfile.ViceOwnerName;
            }
        }
    }
}
