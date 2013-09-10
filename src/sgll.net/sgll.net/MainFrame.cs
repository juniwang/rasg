using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entieies;
using sgll.net.Core.Bridge;
using sgll.net.Core;
using System.IO;
using sgll.net.DockingPanel;
using sgll.net.Core.Queue;
using WeifenLuo.WinFormsUI.Docking;

namespace sgll.net
{
    public partial class MainFrame : UserControl
    {
        public LoginUser LoginInfo { get; set; }
        public TabPage UpTP { get; set; }
        public SGLLController SGLL { get; set; }
        public SGLLData Data { get; set; }

        private delegate void LogEvent_d(TDebugInfo e);
        private delegate void StatusEvent_d(object sender, StatusChangedArgs e);

        private PlayerStatus m_playerStatus = new PlayerStatus();
        private ForceTasks m_forceTasks = new ForceTasks();

        public MainFrame(LoginUser loginInfo)
        {
            LoginInfo = loginInfo;
            Data = new SGLLData(LoginInfo);
            SGLL = new SGLLController(new IPadBridge(), Data);
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("你确定要退出该账号么?", "退出账号",
                            MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button2) == DialogResult.Yes)
            {
                (UpTP.Parent as TabControl).TabPages.Remove(UpTP);
                timer2.Enabled = false;
                timer2.Dispose();
                UpTP.Dispose();
            }
        }

        public void Login()
        {
            UpTP.Text = string.Format("{0} @ {1}", LoginInfo.Username, LoginInfo.Server);
            SGLL.OnLog += new EventHandler<LogArgs>(SGLL_OnLog);
            SGLL.StatusUpdate += new EventHandler<StatusChangedArgs>(SGLL_StatusUpdate);

            if (!SGLL.Login())
            {
                this.dockPanel1.Visible = false;
                var error = new Label();
                error.Text = "登录失败";
                this.Controls.Add(error);
                return;
            }

            SGLL.InitializeQueues();
            //timer for execution queues
            this.timer2.Enabled = true;
            this.timer2.Start();

            //refresh display
            this.timer1.Enabled = true;
            this.timer1.Start();

            this.advanceCall1.Enabled = true;
            m_forceTasks.Display();
        }

        private void RefreshDisplay(ChangedType type)
        {
            if ((type & ChangedType.Profile) == ChangedType.Profile)
            {
                m_playerStatus.Display();
            }
            if ((type & ChangedType.ForceTask) == ChangedType.ForceTask)
            {
                m_forceTasks.Display();
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
            switch (DB.Level)
            {
                case DebugLevel.Debug:
                    if (checkBoxShowDebug.Checked)
                    {
                        string str = string.Format("[{0,-3}]{1,22}@{2,-12}:{3,-4} {4}",
                            DB.Level.ToString(),
                            DB.MethodName,
                            Path.GetFileNameWithoutExtension(DB.Filename),
                            DB.Line,
                            DB.Text);
                        Log(str);
                    }
                    break;
                case DebugLevel.Info:
                    Log(string.Format("[{0,-3}] {1}", DB.Level.ToString(), DB.Text));
                    break;
                case DebugLevel.Error:
                    if (checkBoxShowDebug.Checked)
                    {
                        Log(string.Format("[{0,-3}] {1}",
                            DB.Level.ToString(),
                            DB.Text));
                    }
                    break;
                default:
                    break;
            }
        }

        private void MainFrame_Load(object sender, EventArgs e)
        {
            this.textBoxLog.ContextMenuStrip = contextMenuStrip1;

            m_playerStatus.UpCall = m_forceTasks.UpCall = this.advanceCall1.UpCall = this;

            string fn = GetStyleFilename();
            if (!File.Exists(fn))
                fn = "style\\default!style.xml";
            SuspendLayout();

            if (File.Exists(fn))
                dockPanel1.LoadFromXml(fn, new DeserializeDockContent(FindDocument));
            else
            {
                m_playerStatus.Show(dockPanel1);
                m_forceTasks.Show(dockPanel1);
            }
            m_forceTasks.Activate();
            ResumeLayout();
        }

        string GetStyleFilename()
        {
            string fn = "style\\" + LoginInfo.GetKey() + "!style.xml";
            return fn;
        }

        private IDockContent FindDocument(string text)
        {
            foreach (var x in new DockContent[] { m_forceTasks, m_playerStatus })
            {
                if (text == x.GetType().ToString())
                    return x;
            }
            return null;
        }

        private void Log(string message)
        {
            this.textBoxLog.AppendText(DateTime.Now.ToString() + ": " + message);
            this.textBoxLog.AppendText(Environment.NewLine);
        }

        private void clearToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.textBoxLog.Text = "";
        }

        private void saveToFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            saveFileDialog1.InitialDirectory = Application.ExecutablePath;
            saveFileDialog1.Filter = "word Files(*.doc)|*.doc|All Files(*.*)|*.*";
            saveFileDialog1.OverwritePrompt = true;
            saveFileDialog1.ShowDialog();
            var theFile = saveFileDialog1.FileName;
            StreamWriter writer = null;
            try
            {
                writer = new StreamWriter(theFile, false);
                writer.Write(textBoxLog.Text);
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

        private void timer2_Tick(object sender, EventArgs e)
        {
            SGLL.ExecuteQueue();
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
            if (textBoxLog.Text.Length > 1024 * 1024)
            {
                textBoxLog.Text = textBoxLog.Text.Substring(textBoxLog.Text.Length - 1024);
            }
            RefreshDisplay(ChangedType.All);
        }
    }
}
