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
using sgll.net.Core.Entieies;
using sgll.net.Core.Data;
using sgll.net.Core.Bridge;
using System.Threading;

namespace sgll.net
{
    public partial class MainForm : Form
    {
        public static MainForm Instance;
        public static string VERSION;
        public static List<LoginUser> Users;

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

                Users = AccountsLoader.Load();
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

                Thread t = new Thread(() => { AutoSig.GetSig(); });
                t.Start();
            }
        }


        public void listView1_Refresh()
        {
            this.listViewUsers.Items.Clear();
            for (int i = 0; i < Users.Count; i++)
            {
                ListViewItem lvi = listViewUsers.Items.Add(Users[i].Username);
                lvi.SubItems.Add(Users[i].Server);
                lvi.SubItems.Add(Users[i].Description);
                lvi.SubItems.Add(GetFeatureDisplayNames(Users[i]));
            }
        }

        string GetFeatureDisplayNames(LoginUser user)
        {
            if (user.Features != null && user.Features.Count > 0)
            {
                return string.Join(",", user.Features.Where(p => p.Enabled).Select(p => p.Name));
            }
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
            if (na.ShowDialog() == DialogResult.OK && na.ActionResult != null)
            {
                Users.Add(na.ActionResult);
                listView1_Refresh();
                AccountsLoader.Save(Users);
            }
        }

        private void LoginToolStripMenuItem_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < this.listViewUsers.SelectedIndices.Count; i++)
                newtab(Users[listViewUsers.SelectedIndices[i]]);
        }

        private void EditUsertoolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (this.listViewUsers.SelectedIndices.Count < 1)
                return;
            NewAccount na = new NewAccount(true) { User = Users[listViewUsers.SelectedIndices[0]] };
            if (na.ShowDialog() == DialogResult.OK && na.ActionResult != null)
            {
                //accounts.Add(na.accountresult);
                Users[listViewUsers.SelectedIndices[0]].Username = na.ActionResult.Username;
                Users[listViewUsers.SelectedIndices[0]].Password = na.ActionResult.Password;
                Users[listViewUsers.SelectedIndices[0]].Server = na.ActionResult.Server;
                Users[listViewUsers.SelectedIndices[0]].Description = na.ActionResult.Description;
                listView1_Refresh();
                AccountsLoader.Save(Users);
            }
        }

        private void DeleteUserToolStripMenuItem_Click(object sender, EventArgs e)
        {
            for (int i = listViewUsers.SelectedIndices.Count - 1; i >= 0; i--)
                Users.RemoveAt(listViewUsers.SelectedIndices[i]);
            listView1_Refresh();
            AccountsLoader.Save(Users);
        }

        private void MoveUpToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (listViewUsers.SelectedIndices.Count == 0 || listViewUsers.SelectedIndices[0] == 0)
                return;
            for (int i = 0; i < listViewUsers.SelectedIndices.Count; i++)
            {
                int n = listViewUsers.SelectedIndices[i];
                Users.Reverse(n - 1, 2);
                ListViewItem tlvi = listViewUsers.Items[n - 1];
                listViewUsers.Items.RemoveAt(n - 1);
                listViewUsers.Items.Insert(n, tlvi);
            }
            AccountsLoader.Save(Users);
        }

        private void MoveDownToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (listViewUsers.SelectedIndices.Count == 0 || listViewUsers.SelectedIndices[listViewUsers.SelectedIndices.Count - 1] == listViewUsers.Items.Count - 1)
                return;
            for (int i = listViewUsers.SelectedIndices.Count - 1; i >= 0; i--)
            {
                int n = listViewUsers.SelectedIndices[i];
                Users.Reverse(n, 2);
                ListViewItem tlvi = listViewUsers.Items[n + 1];
                listViewUsers.Items.RemoveAt(n + 1);
                listViewUsers.Items.Insert(n, tlvi);
            }
            AccountsLoader.Save(Users);
        }

        private void LoginAllToolStripMenuItem_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < Users.Count; i++)
                newtab(Users[i]);
        }

        private void newtab(LoginUser LoginInfo)
        {
            // check if repeat login
            for (int i = 1; i < tabControl1.TabCount; i++)
            {
                if (!(tabControl1.TabPages[i].Controls[0] is MainFrame))
                    continue;
                MainFrame mf = tabControl1.TabPages[i].Controls[0] as MainFrame;
                if (mf.LoginInfo.Username == LoginInfo.Username && mf.LoginInfo.Server == LoginInfo.Server)
                {
                    textLog.AppendText(string.Format("[{0}][{1}] {2}{3}", DateTime.Now.ToString(), "Info", "重复登录" + LoginInfo.Username + " @ " + LoginInfo.Server, Environment.NewLine));
                    return;
                }
            }

            TabPage tp = new TabPage();
            MainFrame uc1 = new MainFrame(LoginInfo);
            uc1.UpTP = tp;
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
            if (this.WindowState == FormWindowState.Minimized)
            {
                this.Visible = false;
                this.ShowInTaskbar = false;
                this.notifyIcon1.Visible = true;
            } 
        }

        private void ShowToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Visible = true;
            this.WindowState = FormWindowState.Maximized;
            this.ShowInTaskbar = true;
            this.Activate();
        }

        private void HideToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Visible = false;
            this.ShowInTaskbar = false;
        }

        private void ExitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
