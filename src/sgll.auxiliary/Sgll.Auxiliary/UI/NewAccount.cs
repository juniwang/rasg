using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Sgll.Auxiliary.Core;
using Sgll.Auxiliary.DAL;

namespace Sgll.Auxiliary.UI
{
    public partial class NewAccount : Form
    {
        bool _ismodify;
        public User User { get; set; }

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
                txtAccount.Text = User.Account;
                txtPassword.Text = User.Password;
                txtRole.Text = User.Role;
                txtDescription.Text = User.Description;
                comboBoxServer.SelectedValue = User.Server;
            }
        }

        private void Btn_OK_Click(object sender, EventArgs e)
        {
            var role = txtRole.Text;
            if (string.IsNullOrEmpty(role))
            {
                MessageBox.Show("角色不能为空！");
                DialogResult = DialogResult.None;
                return;
            }

            if (User == null)
            {
                User = new User { CreateTime = DateTime.Now, Id = 0 };
            }

            User.Account = txtAccount.Text;
            User.Password = txtPassword.Text;
            User.Role = role;
            User.Server = comboBoxServer.SelectedItem.ToString();
            User.Description = txtDescription.Text;
            User.UpdateTime = DateTime.Now;
        }
    }
}
