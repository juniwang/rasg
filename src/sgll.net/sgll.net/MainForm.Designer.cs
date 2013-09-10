namespace sgll.net
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.LoginToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.LoginAllToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.AddUserToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.EditUsertoolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.DeleteUserToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.MoveUpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.MoveDownToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.textLog = new System.Windows.Forms.TextBox();
            this.listViewUsers = new System.Windows.Forms.ListView();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.notifyIcon1 = new System.Windows.Forms.NotifyIcon(this.components);
            this.contextMenuStrip1.SuspendLayout();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.SuspendLayout();
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.LoginToolStripMenuItem,
            this.LoginAllToolStripMenuItem,
            this.toolStripSeparator1,
            this.AddUserToolStripMenuItem,
            this.EditUsertoolStripMenuItem,
            this.DeleteUserToolStripMenuItem,
            this.toolStripSeparator2,
            this.MoveUpToolStripMenuItem,
            this.MoveDownToolStripMenuItem});
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(189, 170);
            // 
            // LoginToolStripMenuItem
            // 
            this.LoginToolStripMenuItem.Name = "LoginToolStripMenuItem";
            this.LoginToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.L)));
            this.LoginToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.LoginToolStripMenuItem.Tag = "login";
            this.LoginToolStripMenuItem.Text = "&L.  登录";
            this.LoginToolStripMenuItem.Click += new System.EventHandler(this.LoginToolStripMenuItem_Click);
            // 
            // LoginAllToolStripMenuItem
            // 
            this.LoginAllToolStripMenuItem.Name = "LoginAllToolStripMenuItem";
            this.LoginAllToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.O)));
            this.LoginAllToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.LoginAllToolStripMenuItem.Text = "&O. 全部登录";
            this.LoginAllToolStripMenuItem.Click += new System.EventHandler(this.LoginAllToolStripMenuItem_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(185, 6);
            // 
            // AddUserToolStripMenuItem
            // 
            this.AddUserToolStripMenuItem.Name = "AddUserToolStripMenuItem";
            this.AddUserToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.A)));
            this.AddUserToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.AddUserToolStripMenuItem.Text = "&A. 添加账号";
            this.AddUserToolStripMenuItem.Click += new System.EventHandler(this.AddUserToolStripMenuItem_Click);
            // 
            // EditUsertoolStripMenuItem
            // 
            this.EditUsertoolStripMenuItem.Name = "EditUsertoolStripMenuItem";
            this.EditUsertoolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.E)));
            this.EditUsertoolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.EditUsertoolStripMenuItem.Text = "&E. 编辑账号";
            this.EditUsertoolStripMenuItem.Click += new System.EventHandler(this.EditUsertoolStripMenuItem_Click);
            // 
            // DeleteUserToolStripMenuItem
            // 
            this.DeleteUserToolStripMenuItem.Name = "DeleteUserToolStripMenuItem";
            this.DeleteUserToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.D)));
            this.DeleteUserToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.DeleteUserToolStripMenuItem.Text = "&D. 删除账户";
            this.DeleteUserToolStripMenuItem.Click += new System.EventHandler(this.DeleteUserToolStripMenuItem_Click);
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = new System.Drawing.Size(185, 6);
            // 
            // MoveUpToolStripMenuItem
            // 
            this.MoveUpToolStripMenuItem.Name = "MoveUpToolStripMenuItem";
            this.MoveUpToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.Up)));
            this.MoveUpToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.MoveUpToolStripMenuItem.Tag = "moveup";
            this.MoveUpToolStripMenuItem.Text = "上移";
            this.MoveUpToolStripMenuItem.Click += new System.EventHandler(this.MoveUpToolStripMenuItem_Click);
            // 
            // MoveDownToolStripMenuItem
            // 
            this.MoveDownToolStripMenuItem.Name = "MoveDownToolStripMenuItem";
            this.MoveDownToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.Down)));
            this.MoveDownToolStripMenuItem.Size = new System.Drawing.Size(188, 22);
            this.MoveDownToolStripMenuItem.Tag = "movedown";
            this.MoveDownToolStripMenuItem.Text = "下移";
            this.MoveDownToolStripMenuItem.Click += new System.EventHandler(this.MoveDownToolStripMenuItem_Click);
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 0);
            this.tabControl1.Multiline = true;
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(824, 529);
            this.tabControl1.TabIndex = 1;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.textLog);
            this.tabPage1.Controls.Add(this.listViewUsers);
            this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(816, 503);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "账号管理";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // textLog
            // 
            this.textLog.Dock = System.Windows.Forms.DockStyle.Fill;
            this.textLog.Location = new System.Drawing.Point(504, 3);
            this.textLog.Multiline = true;
            this.textLog.Name = "textLog";
            this.textLog.ScrollBars = System.Windows.Forms.ScrollBars.Horizontal;
            this.textLog.Size = new System.Drawing.Size(309, 497);
            this.textLog.TabIndex = 1;
            // 
            // listViewUsers
            // 
            this.listViewUsers.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3,
            this.columnHeader4});
            this.listViewUsers.ContextMenuStrip = this.contextMenuStrip1;
            this.listViewUsers.Dock = System.Windows.Forms.DockStyle.Left;
            this.listViewUsers.FullRowSelect = true;
            this.listViewUsers.GridLines = true;
            this.listViewUsers.HeaderStyle = System.Windows.Forms.ColumnHeaderStyle.Nonclickable;
            this.listViewUsers.Location = new System.Drawing.Point(3, 3);
            this.listViewUsers.Name = "listViewUsers";
            this.listViewUsers.Size = new System.Drawing.Size(501, 497);
            this.listViewUsers.TabIndex = 0;
            this.listViewUsers.UseCompatibleStateImageBehavior = false;
            this.listViewUsers.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Tag = "UserName";
            this.columnHeader1.Text = "用户名";
            this.columnHeader1.Width = 99;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Tag = "Server";
            this.columnHeader2.Text = "服务器";
            this.columnHeader2.Width = 68;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Tag = "Description";
            this.columnHeader3.Text = "简介";
            this.columnHeader3.Width = 156;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Tag = "features";
            this.columnHeader4.Text = "任务";
            this.columnHeader4.Width = 173;
            // 
            // notifyIcon1
            // 
            this.notifyIcon1.Text = "notifyIcon1";
            this.notifyIcon1.Visible = true;
            this.notifyIcon1.MouseClick += new System.Windows.Forms.MouseEventHandler(this.notifyIcon1_MouseClick);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(824, 529);
            this.Controls.Add(this.tabControl1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainForm";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.contextMenuStrip1.ResumeLayout(false);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TextBox textLog;
        private System.Windows.Forms.ListView listViewUsers;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private System.Windows.Forms.ColumnHeader columnHeader3;
        private System.Windows.Forms.NotifyIcon notifyIcon1;
        private System.Windows.Forms.ToolStripMenuItem LoginToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem LoginAllToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.ToolStripMenuItem AddUserToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem EditUsertoolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem DeleteUserToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator2;
        private System.Windows.Forms.ToolStripMenuItem MoveUpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem MoveDownToolStripMenuItem;
        private System.Windows.Forms.ColumnHeader columnHeader4;
    }
}

