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
using sgll.net.Core.Queue;

namespace sgll.net.DockingPanel
{
    public partial class BuyHuangjinTreasure : DockContent
    {
        public MainFrame UpCall { get; set; }

        public BuyHuangjinTreasure()
        {
            InitializeComponent();
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {

        }

        public void Display()
        {
            if (UpCall.Data.LoginUser.Features != null)
            {
                var feature = UpCall.Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == SGLLController.QueueGUID.HuangjinTreasureQueue);
                if (feature != null)
                {
                    this.Text = feature.Enabled ? "黄巾宝藏[自动中]" : "黄巾宝藏";
                    if (feature.Enabled)
                    {
                        this.buttonStart.Enabled = false;
                        this.buttonStop.Enabled = true;

                        if (UpCall.Data.HuangjinTreasure != null)
                        {
                            var t = UpCall.Data.HuangjinTreasure;

                            //刷新倒计时
                            var time1 = t.LastSyncTime.AddSeconds(t.ExpireSecond);
                            int cd1 = time1 < DateTime.Now ? 0 : (int)(time1 - DateTime.Now).TotalSeconds;
                            this.labelExpire.Text = new TimeSpan(0, 0, cd1).ToString();

                            //status
                            if (t.Items != null)
                            {
                                var tobuy = t.Items.Where(p => HuangjinTreasureQueue.toBuy.Contains(p.EntityName));
                                if (tobuy.All(p => p.Bought == 1))
                                {
                                    this.labelStatus.ForeColor = Color.LightGreen;
                                    this.labelStatus.Text = "已购买";
                                    this.labelToBuy.Text = SR.Display.ColdDownZero;
                                }
                                else
                                {
                                    this.labelStatus.ForeColor = Color.LightYellow;
                                    this.labelStatus.Text = "未购买";

                                    //购买倒计时
                                    var time2 = t.LastSyncTime.AddSeconds(t.BuyDelay);
                                    int cd2 = time2 < DateTime.Now ? 0 : (int)(time2 - DateTime.Now).TotalSeconds;
                                    this.labelToBuy.Text = new TimeSpan(0, 0, cd2).ToString();
                                }
                            }
                        }
                    }
                }
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StartQueue(SGLLController.QueueGUID.HuangjinTreasureQueue);
            var dic = new Dictionary<string, string>();
            dic.Add(SR.QueueParameterKeys.AutoUseVMBoxForTreasure, this.checkBoxUseBox.Checked.ToString().ToLower());
            UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.HuangjinTreasureQueue, dic);

            Display();
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            UpCall.SGLL.StopQueue(SGLLController.QueueGUID.HuangjinTreasureQueue);

            Display();
        }
    }
}
