using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using sgll.net.Core;

namespace sgll.net.DockingPanel
{
    public partial class CardSalePanel : DockContent
    {
        private bool startStopInited = false;
        private bool firstLoad = true;
        int Qid = SGLLController.QueueGUID.CardSaleQueue;
        public MainFrame UpCall { get; set; }

        public CardSalePanel()
        {
            InitializeComponent();
        }

        private void DisplayStartStop()
        {
            if (!startStopInited)
            {
                InitStartStop();
                startStopInited = true;
            }
            this.startStop1.Display();
        }

        private void InitStartStop()
        {
            this.startStop1.SGLL = UpCall.SGLL;
            this.startStop1.Qid = Qid;
            this.startStop1.StatusUpdate = ChangedType.CardSale;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () => SaveParameters();
        }

        private void SaveParameters()
        {
            var dic = new Dictionary<string, string>();
            // level1 only
            dic.Add(SR.ParaKey.CardSaleLevel1, this.checkBoxLevel1Only.Checked.ToString().ToLower());
            // rarity
            var rids = new List<string>();
            if (this.checkBoxOneStar.Checked) rids.Add("5");
            if (this.checkBoxTwoStar.Checked) rids.Add("4");
            if (this.checkBoxThreeStar.Checked) rids.Add("3");
            dic.Add(SR.ParaKey.CardSaleRarity, string.Join(",", rids).Trim(','));
            // types
            var tids = new List<string>();
            if (this.checkBoxWei.Checked) tids.Add("1_1");
            if (this.checkBoxShu.Checked) tids.Add("1_2");
            if (this.checkBoxWu.Checked) tids.Add("1_3");
            if (this.checkBoxQun.Checked) tids.Add("1_4");
            if (this.checkBoxJin.Checked) tids.Add("1_5");
            if (this.checkBoxHan.Checked) tids.Add("1_6");
            if (this.checkBoxHorse.Checked) tids.Add("4");
            if (this.checkBoxArmor.Checked) tids.Add("3");
            if (this.checkBoxWeapon.Checked) tids.Add("2");
            dic.Add(SR.ParaKey.CardSaleType, string.Join(",", tids).Trim(','));

            UpCall.SGLL.SetQueueParameters(Qid, dic);
            Display();
        }

        /*{"errorCode":0,"errorMsg":"","data":{"groups":[],
         * "types":[
         * {"id":"1_2","name":"蜀国将领","intensify_type":[{"id":"1"}]},
         * {"id":"1_1","name":"魏国将领","intensify_type":[{"id":"1"}]},
         * {"id":"1_3","name":"吴国将领","intensify_type":[{"id":"1"}]},
         * {"id":"1_4","name":"群雄将领","intensify_type":[{"id":"1"}]},
         * {"id":"1_5","name":"晋国将领","intensify_type":[{"id":"1"}]},
         * {"id":"1_6","name":"东汉将领","intensify_type":[{"id":"1"}]},
         * {"id":"2","name":"武器","intensify_type":[{"id":"2"},{"id":"3"},{"id":"4"}]},
         * {"id":"3","name":"防具","intensify_type":[{"id":"2"},{"id":"3"},{"id":"4"}]},
         * {"id":"4","name":"坐骑","intensify_type":[{"id":"2"},{"id":"3"},{"id":"4"}]},
         * {"id":"5","name":"宝物","intensify_type":[{"id":"5"}]},
         * {"id":"6","name":"收集品","intensify_type":[]},
         * {"id":"7","name":"道具","intensify_type":[]},
         * {"id":"8","name":"扭蛋","intensify_type":[]}],
         * "rarities":[{"id":"1","name":"五星"},{"id":"2","name":"四星"},{"id":"3","name":"三星"},{"id":"4","name":"二星"},{"id":"5","name":"一星"}],
         * "orders":[{"id":5,"name":"攻击降"},{"id":6,"name":"防御降"},{"id":1,"name":"星级降"},{"id":2,"name":"星级升"},{"id":3,"name":"级别降"},{"id":4,"name":"级别升"}]}}
         */
        private void DisplayParameters()
        {
            var user = UpCall.SGLL.Data.LoginUser;
            var rids = user.GetParameter(Qid, SR.ParaKey.CardSaleRarity, "3,4,5").Split(',');
            this.checkBoxOneStar.Checked = rids.Contains("5");
            this.checkBoxTwoStar.Checked = rids.Contains("4");
            this.checkBoxThreeStar.Checked = rids.Contains("3");

            var tids = user.GetParameter(Qid, SR.ParaKey.CardSaleType, "1_1,1_2,1_3,1_4,2,3,4").Split(',');
            this.checkBoxWei.Checked = tids.Contains("1_1");
            this.checkBoxShu.Checked = tids.Contains("1_2");
            this.checkBoxWu.Checked = tids.Contains("1_3");
            this.checkBoxQun.Checked = tids.Contains("1_4");
            this.checkBoxJin.Checked = tids.Contains("1_5");
            this.checkBoxHan.Checked = tids.Contains("1_6");
            this.checkBoxHorse.Checked = tids.Contains("4");
            this.checkBoxArmor.Checked = tids.Contains("3");
            this.checkBoxWeapon.Checked = tids.Contains("2");
        }

        public void Display()
        {
            DisplayStartStop();
            if (firstLoad)
            {
                DisplayParameters();
                this.checkBoxLevel1Only.Checked = bool.Parse(UpCall.SGLL.Data.LoginUser.GetParameter(Qid, SR.ParaKey.CardSaleLevel1, "true"));
                firstLoad = false;
                labelExclude.Text = "保留卡片：蒋干，蒙古马，超级蒋干，超级蒙古马，龙渊剑";
            }
        }

        private void buttonApply_Click(object sender, EventArgs e)
        {
            SaveParameters();
        }
    }
}
