using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Reflection;
using System.Configuration;
using System.Threading;
using Sgll.Auxiliary.Core;
using Sgll.Auxiliary.DAL;
using Sgll.Auxiliary.UI;

namespace Sgll.Auxiliary
{
    public partial class MainForm : Form
    {
        public static MainForm Instance;
        public static string VERSION;

        public MainForm()
        {
            InitializeComponent();
            Instance = this;
            AssemblyName aName = this.GetType().Assembly.GetName();
            Version v = aName.Version;
            //int rev = Convert.ToInt32(svnid.Split(' ')[1]);
            DateTime CompileTime = GetPe32Time(this.GetType().Assembly.Location);
            if (CompileTime == DateTime.MinValue)
                CompileTime = File.GetLastWriteTime(this.GetType().Assembly.Location);
            VERSION = Text = string.Format("{0} {1} [{2} 测试版本]", aName.Name, v, CompileTime.ToString("yyyy-MM-dd"));
            notifyIcon1.Text = Text;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            Register na = new Register();
            if (!na.CheckSN() && na.ShowDialog() != DialogResult.OK)
            {
                this.Close();
            }
            else
            {
                listView1_Refresh();

                //release notes
                if (File.Exists("MOTD"))
                {
                    FileStream fs = new FileStream("MOTD", FileMode.Open, FileAccess.Read);
                    StreamReader sr = new StreamReader(fs, Encoding.UTF8);
                    this.textLog.AppendText(sr.ReadToEnd());
                    textLog.AppendText(Environment.NewLine);
                    sr.Close();
                }

                //tips
                //release notes
                if (File.Exists("TIPS"))
                {
                    FileStream fs = new FileStream("TIPS", FileMode.Open, FileAccess.Read);
                    StreamReader sr = new StreamReader(fs, Encoding.UTF8);
                    this.textBoxTips.AppendText(sr.ReadToEnd());
                    textLog.AppendText(Environment.NewLine);
                    sr.Close();
                }

                //Thread t = new Thread(() => { AutoSig.GetSig(); });
                //t.Start();
            }
        }


        public void listView1_Refresh()
        {
            this.listViewUsers.Items.Clear();
            foreach (var user in AccountsLoader.LoadAll())
            {
                ListViewItem lvi = listViewUsers.Items.Add(user.Account);
                lvi.SubItems.Add(user.Role);
                lvi.SubItems.Add(user.Server);
                lvi.SubItems.Add(user.Description);
                lvi.SubItems.Add(GetFeatureDisplayNames(user));
            }
        }

        string GetFeatureDisplayNames(User user)
        {
            // TODO show something
            return "";
        }

        DateTime GetPe32Time(string fileName)
        {
            int seconds;
            using (var br = new BinaryReader(new FileStream(fileName, FileMode.Open, FileAccess.Read)))
            {
                var bs = br.ReadBytes(2);
                if (bs.Length != 2) return DateTime.MinValue;
                if (bs[0] != 'M' || bs[1] != 'Z') return DateTime.MinValue;
                br.BaseStream.Seek(0x3c, SeekOrigin.Begin);
                var offset = br.ReadByte();
                br.BaseStream.Seek(offset, SeekOrigin.Begin);
                bs = br.ReadBytes(4);
                if (bs.Length != 4) return DateTime.MinValue;
                if (bs[0] != 'P' || bs[1] != 'E' || bs[2] != 0 || bs[3] != 0) return DateTime.MinValue;
                bs = br.ReadBytes(4);
                if (bs.Length != 4) return DateTime.MinValue;
                seconds = br.ReadInt32();
            }
            return DateTime.SpecifyKind(new DateTime(1970, 1, 1), DateTimeKind.Utc).
                    AddSeconds(seconds).ToLocalTime();
        }

        private void notifyIcon1_MouseClick(object sender, MouseEventArgs e)
        {
            if (!bool.Parse(ConfigurationManager.AppSettings["NotifyIcon"]))
            {
                return;
            }

            if (e.Button == MouseButtons.Left)
                if (WindowState == FormWindowState.Minimized)
                {
                    Visible = true;
                    WindowState = FormWindowState.Maximized;
                    ShowInTaskbar = true;
                }
                else
                {
                    WindowState = FormWindowState.Minimized;
                    Visible = false;
                    ShowInTaskbar = false;
                }
        }

        private void AddUserToolStripMenuItem_Click(object sender, EventArgs e)
        {
            NewAccount na = new NewAccount(false);
            if (na.ShowDialog() == DialogResult.OK)
            {
                AccountsLoader.InsertUser(na.User);
                listView1_Refresh();
            }
        }

        private void LoginToolStripMenuItem_Click(object sender, EventArgs e)
        {
            var users = AccountsLoader.LoadAll();
            for (int i = 0; i < this.listViewUsers.SelectedIndices.Count; i++)
                newtab(users[listViewUsers.SelectedIndices[i]]);
        }

        private void EditUsertoolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (this.listViewUsers.SelectedIndices.Count < 1)
                return;

            var users = AccountsLoader.LoadAll();
            NewAccount na = new NewAccount(true) { User = users[listViewUsers.SelectedIndices[0]] };
            if (na.ShowDialog() == DialogResult.OK)
            {
                AccountsLoader.InsertOrUpdate(na.User);
                listView1_Refresh();
            }
        }

        private void DeleteUserToolStripMenuItem_Click(object sender, EventArgs e)
        {
            List<User> toDelete = new List<User>();
            var users = AccountsLoader.LoadAll();
            for (int i = listViewUsers.SelectedIndices.Count - 1; i >= 0; i--)
                toDelete.Add(users[listViewUsers.SelectedIndices[i]]);

            if (toDelete.Count > 0)
            {
                AccountsLoader.DeleteUsers(toDelete);
                listView1_Refresh();
            }
        }

        private void LoginAllToolStripMenuItem_Click(object sender, EventArgs e)
        {
            foreach (var user in AccountsLoader.LoadAll())
            {
                newtab(user);
            }
        }

        private void newtab(User user)
        {
            // check if repeat login
            for (int i = 1; i < tabControl1.TabCount; i++)
            {
                if (!(tabControl1.TabPages[i].Controls[0] is MainFrame))
                    continue;
                MainFrame mf = tabControl1.TabPages[i].Controls[0] as MainFrame;
                if (mf.User.GetMultiCtrlKey() == user.GetMultiCtrlKey())
                {
                    textLog.AppendText(string.Format("[{0}][{1}] {2}{3}",
                        DateTime.Now.ToString(),
                        "Info",
                        "重复登录" + user.GetMultiCtrlKey(),
                        Environment.NewLine));
                    return;
                }
            }

            TabPage tp = new TabPage();
            MainFrame uc1 = new MainFrame(user);
            uc1.TP = tp;
            uc1.Dock = DockStyle.Fill;
            tp.Controls.Add(uc1);
            tabControl1.TabPages.Add(tp);
            tabControl1.SelectTab(tp);
            uc1.Login();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            listView1_Refresh();
        }

        private void MainForm_SizeChanged(object sender, EventArgs e)
        {
            if (!bool.Parse(ConfigurationManager.AppSettings["NotifyIcon"]))
            {
                return;
            }

            if (this.WindowState == FormWindowState.Minimized)
            {
                this.Visible = false;
                this.ShowInTaskbar = false;
                this.notifyIcon1.Visible = true;
            }
        }

        private void ShowToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (!bool.Parse(ConfigurationManager.AppSettings["NotifyIcon"]))
            {
                return;
            }

            this.Visible = true;
            this.WindowState = FormWindowState.Maximized;
            this.ShowInTaskbar = true;
            this.Activate();
        }

        private void HideToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (!bool.Parse(ConfigurationManager.AppSettings["NotifyIcon"]))
            {
                return;
            }

            this.Visible = false;
            this.ShowInTaskbar = false;
        }

        private void ExitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void MultipleUserCtlToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //MutipleControlPanel na = new MutipleControlPanel();
            //if (na.ShowDialog() == DialogResult.OK)
            //{
            //    listView1_Refresh();
            //}
        }
    }
}
