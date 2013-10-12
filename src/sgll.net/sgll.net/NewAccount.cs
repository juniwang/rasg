using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using sgll.net.Core.Entities;

namespace sgll.net
{
    public partial class NewAccount : Form
    {
        bool _ismodify;
        public LoginUser User { get; set; }
        public LoginUser ActionResult { get; private set; }

        public NewAccount(bool isModify)
        {
            _ismodify = isModify;
            InitializeComponent();
        }

        private void NewAccount_Load(object sender, EventArgs e)
        {
            comboBoxServer.SelectedIndex = 0;
            if (_ismodify)
                Text = "编辑账户";
            else
                Text = "添加账户";
            if (User != null)
            {
                txtUsername.Text = User.Username;
                txtPassword.Text = User.Password;
                txtDescription.Text = User.Description;
                comboBoxServer.SelectedValue = User.Server;
            }
        }

        private void Btn_OK_Click(object sender, EventArgs e)
        {
            var un = txtUsername.Text;
            var pwd = txtPassword.Text;

            if (string.IsNullOrEmpty(un) || string.IsNullOrEmpty(pwd))
            {
                MessageBox.Show("用户名/密码不能为空！");
                DialogResult = System.Windows.Forms.DialogResult.None;
                return;
            }

            ActionResult = new LoginUser
            {
                Username = un,
                Password = pwd,
                Description = txtDescription.Text,
                Server = comboBoxServer.SelectedItem.ToString()
            };
        }
    }
}
