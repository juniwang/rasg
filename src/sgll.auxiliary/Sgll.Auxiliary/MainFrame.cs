using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using WeifenLuo.WinFormsUI.Docking;
using Sgll.Auxiliary.Core;
using Sgll.Auxiliary.DAL;

namespace Sgll.Auxiliary
{
    public partial class MainFrame : UserControl
    {
        public User User { get; set; }
        public TabPage TP { get; set; }
        public SgllController SgController { get; set; }
        public SgllData Data { get; set; }

        private delegate void LogEvent_d(TDebugInfo e);
        private delegate void StatusEvent_d(object sender, StatusChangedArgs e);

        //private PlayerStatus m_playerStatus = new PlayerStatus();
        //private ForceTasks m_forceTasks = new ForceTasks();
        //private BuyHuangjinTreasure m_huangjinTreansure = new BuyHuangjinTreasure();
        //private ForceProfilePanel m_forceProfile = new ForceProfilePanel();
        //private ForceExchangePanel m_forceExchange = new ForceExchangePanel();
        //private CollectPanel m_collect = new CollectPanel();
        //private FubenPanel m_fuben = new FubenPanel();
        //private MissionPanel m_mission = new MissionPanel();
        //private ForceBossPanel m_forceBoss = new ForceBossPanel();
        //private SigninPanel m_signin = new SigninPanel();
        //private DaojuPanel m_daoju = new DaojuPanel();
        //private MoneyMonitorPanel m_money = new MoneyMonitorPanel();
        //private CardSalePanel m_cardSale = new CardSalePanel();
        //private ActivityPanel m_activity = new ActivityPanel();

        private List<string> LogShowText = new List<string> { "调试", "详细", "简略" };

        public MainFrame(User user)
        {
            User = user;
            Data = new SgllData(user);
            SgController = new SgllController(Data);
            MultipleUserCtl.RegisterController(user.GetMultiCtrlKey(), SgController);
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("你确定要退出该账号么?", "退出账号",
                            MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button2) == DialogResult.Yes)
            {
                (TP.Parent as TabControl).TabPages.Remove(TP);
                MultipleUserCtl.UnRegisterController(User.GetMultiCtrlKey());
                SgController.Close();
                timer1.Enabled = false;
                timer1.Dispose();
                TP.Dispose();
            }
        }

        public void Login()
        {
            TP.Text = string.Format("{0} @ {1}", User.Role, User.Server);
            SgController.OnLog += new EventHandler<LogArgs>(SGLL_OnLog);
            SgController.StatusUpdate += new EventHandler<StatusChangedArgs>(SGLL_StatusUpdate);

            if (!SgController.Login())
            {
                this.dockPanel1.Visible = false;
                var error = new Label();
                error.Text = "登录失败";
                this.Controls.Add(error);
                return;
            }

            SgController.InitializeQueues();

            //refresh display
            this.timer1.Enabled = true;
            this.timer1.Start();

            //this.advanceCall1.Enabled = true;
            //m_forceTasks.Display();
        }

        private void RefreshDisplay(ChangedType type)
        {
            if ((type & ChangedType.Profile) == ChangedType.Profile)
            {
                //m_playerStatus.Display();
            }
            if ((type & ChangedType.ForceTask) == ChangedType.ForceTask)
            {
                //m_forceTasks.Display();
            }
        }

        void SGLL_StatusUpdate(object sender, StatusChangedArgs e)
        {
            try
            {
                Invoke(new StatusEvent_d(Local_StatusUpdate), new object[] { sender, e });
            }
            catch (Exception)
            { }
        }

        void Local_StatusUpdate(object sender, StatusChangedArgs e)
        {
            RefreshDisplay(e.ChangedData);
        }

        void SGLL_OnLog(object sender, LogArgs e)
        {
            try
            {
                Invoke(new LogEvent_d(WriteLog), new object[] { e.DebugInfo });
            }
            catch (Exception)
            { }
        }

        private void WriteLog(TDebugInfo DB)
        {
            WriteLog(DB.Text, DB.Level);
        }

        private void InitLogLevelComboBox()
        {
            comboBox1.Items.Clear();
            LogShowText.ForEach(p => comboBox1.Items.Add(p));
            comboBox1.SelectedItem = LogShowText.Last();
        }

        private void MainFrame_Load(object sender, EventArgs e)
        {
            InitLogLevelComboBox();

            //m_playerStatus.UpCall = m_forceProfile.UpCall = m_huangjinTreansure.UpCall = m_collect.UpCall
            //    = m_fuben.UpCall = m_signin.UpCall = m_daoju.UpCall = m_mission.UpCall = m_forceTasks.UpCall
            //    = m_forceExchange.UpCall = advanceCall1.UpCall = m_forceBoss.UpCall = m_money.UpCall
            //    = m_cardSale.UpCall = m_activity.UpCall = this;
            //advanceCall1.RegisterMultipleCall();

            string fn = GetStyleFilename();
            if (!File.Exists(fn))
                fn = "style\\default!style.xml";
            SuspendLayout();

            //if (File.Exists(fn))
            //{
            //if (!dockPanel1.Contains(m_playerStatus))
            //    dockPanel1.LoadFromXml(fn, new DeserializeDockContent(FindDocument));
            //}
            //else
            //{
            //m_playerStatus.Show(dockPanel1);
            //m_forceProfile.Show(dockPanel1);
            //m_daoju.Show(dockPanel1);
            //m_forceTasks.Show(dockPanel1);
            //m_collect.Show(dockPanel1);
            //m_fuben.Show(dockPanel1);
            //m_mission.Show(dockPanel1);
            //m_signin.Show(dockPanel1);
            //m_huangjinTreansure.Show(dockPanel1);
            //m_forceExchange.Show(dockPanel1);
            //m_forceBoss.Show(dockPanel1);
            //m_money.Show(dockPanel1);
            //m_cardSale.Show(dockPanel1);
            //m_activity.Show(dockPanel1);
            //}
            //m_playerStatus.Activate();
            ResumeLayout();
        }

        string GetStyleFilename()
        {
            //string fn = "style\\" + LoginInfo.GetKey() + "!style.xml";
            //return fn;
            return "";
        }

        private IDockContent FindDocument(string text)
        {
            //foreach (var x in new DockContent[] { m_forceExchange, m_forceProfile, m_forceTasks, m_playerStatus, m_collect, m_daoju,
            //    m_huangjinTreansure, m_fuben ,m_mission,m_forceBoss, m_signin, m_money, m_cardSale,m_activity})
            //{
            //    if (text == x.GetType().ToString())
            //        return x;
            //}
            return null;
        }

        private LogLevel GetLogShowLevel()
        {
            var index = this.comboBox1.SelectedIndex;
            if (index == 0) return LogLevel.Debug;
            else if (index == 1) return LogLevel.Info;
            else return LogLevel.Warn;
        }

        private Color LogShowColor(LogLevel level)
        {
            switch (level)
            {
                //case LogLevel.All:
                //    break;
                case LogLevel.Debug:
                    return Color.Orange;
                case LogLevel.Info:
                    return Color.Purple;
                case LogLevel.Warn:
                    return Color.Blue;
                case LogLevel.Error:
                    return Color.Red;
                default:
                    return Color.Blue;
            }
        }

        private void WriteLog(string message, LogLevel level)
        {
            if (level >= GetLogShowLevel())
            {
                this.richTextBoxLog.SelectionColor = LogShowColor(level);
                this.richTextBoxLog.AppendText(DateTime.Now.ToString() + ":" + message + Environment.NewLine);
            }
        }

        private void clearToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.richTextBoxLog.Text = "";
        }

        private void saveToFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            saveFileDialog1.InitialDirectory = Application.ExecutablePath;
            saveFileDialog1.Filter = "text Files(*.txt)|*.txt|All Files(*.*)|*.*";
            saveFileDialog1.OverwritePrompt = true;
            saveFileDialog1.ShowDialog();
            var theFile = saveFileDialog1.FileName;
            StreamWriter writer = null;
            try
            {
                writer = new StreamWriter(theFile, false);
                writer.Write(this.richTextBoxLog.Text);
                writer.Close();
            }
            catch (Exception excep)
            {
                MessageBox.Show(excep.Message);
            }
            finally
            {
                if (writer != null)
                    writer.Close();
            }
        }

        private void dockPanel1_Resize(object sender, EventArgs e)
        {
            if (dockPanel1.Contents.Count != 0)
            {
                string fn = GetStyleFilename();
                dockPanel1.SaveAsXml(fn);
            }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (richTextBoxLog.Text.Length > 1024 * 1024)
            {
                richTextBoxLog.Text = richTextBoxLog.Text.Substring(richTextBoxLog.Text.Length - 1024);
            }

            RefreshDisplay(ChangedType.All);
        }
    }
}
