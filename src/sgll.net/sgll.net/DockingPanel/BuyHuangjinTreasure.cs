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
        private bool startStopInited = false;
        public MainFrame UpCall { get; set; }

        public BuyHuangjinTreasure()
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
            this.startStop1.Qid = SGLLController.QueueGUID.HuangjinTreasureQueue;
            this.startStop1.StatusUpdate = ChangedType.HuangjinTreasure;
            this.startStop1.TextControl = this;
            this.startStop1.OnStart = () =>
            {
                var dic = new Dictionary<string, string>();
                dic.Add(SR.ParaKey.AutoUseVMBoxForTreasure, this.checkBoxUseBox.Checked.ToString().ToLower());
                UpCall.SGLL.SetQueueParameters(SGLLController.QueueGUID.HuangjinTreasureQueue, dic);
            };
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {

        }

        public void Display()
        {
            DisplayStartStop();
            if (UpCall.Data.LoginUser.Features != null)
            {
                var feature = UpCall.Data.LoginUser.Features.SingleOrDefault(p => p.TaskId == SGLLController.QueueGUID.HuangjinTreasureQueue);
                if (feature != null)
                {
                    if (feature.Enabled)
                    {
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
                                    this.labelToBuy.Text = SR.Display.ColdDownDisable;
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

        private void BuyHuangjinTreasure_Load(object sender, EventArgs e)
        {
            DisplayStartStop();
        }
    }
}
