namespace Sgll.Auxiliary.UI
{
    partial class NewAccount
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
            this.txtAccount = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.comboBoxServer = new System.Windows.Forms.ComboBox();
            this.Btn_Cancel = new System.Windows.Forms.Button();
            this.Btn_OK = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.txtDescription = new System.Windows.Forms.TextBox();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtRole = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // txtAccount
            // 
            this.txtAccount.Location = new System.Drawing.Point(188, 30);
            this.txtAccount.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.txtAccount.Name = "txtAccount";
            this.txtAccount.Size = new System.Drawing.Size(268, 26);
            this.txtAccount.TabIndex = 16;
            // 
            // label1
            // 
            this.label1.Location = new System.Drawing.Point(21, 182);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(140, 23);
            this.label1.TabIndex = 27;
            this.label1.Tag = "server";
            this.label1.Text = "服务器";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // comboBoxServer
            // 
            this.comboBoxServer.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxServer.FormattingEnabled = true;
            this.comboBoxServer.Items.AddRange(new object[] {
            "IPhone"});
            this.comboBoxServer.Location = new System.Drawing.Point(188, 180);
            this.comboBoxServer.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.comboBoxServer.Name = "comboBoxServer";
            this.comboBoxServer.Size = new System.Drawing.Size(268, 28);
            this.comboBoxServer.TabIndex = 30;
            // 
            // Btn_Cancel
            // 
            this.Btn_Cancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Btn_Cancel.Location = new System.Drawing.Point(296, 367);
            this.Btn_Cancel.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Btn_Cancel.Name = "Btn_Cancel";
            this.Btn_Cancel.Size = new System.Drawing.Size(120, 45);
            this.Btn_Cancel.TabIndex = 33;
            this.Btn_Cancel.Tag = "cancel";
            this.Btn_Cancel.Text = "Cancel";
            this.Btn_Cancel.UseVisualStyleBackColor = true;
            // 
            // Btn_OK
            // 
            this.Btn_OK.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.Btn_OK.Location = new System.Drawing.Point(128, 367);
            this.Btn_OK.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Btn_OK.Name = "Btn_OK";
            this.Btn_OK.Size = new System.Drawing.Size(120, 45);
            this.Btn_OK.TabIndex = 32;
            this.Btn_OK.Tag = "save";
            this.Btn_OK.Text = "OK";
            this.Btn_OK.UseVisualStyleBackColor = true;
            this.Btn_OK.Click += new System.EventHandler(this.Btn_OK_Click);
            // 
            // label4
            // 
            this.label4.Location = new System.Drawing.Point(21, 239);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(140, 23);
            this.label4.TabIndex = 26;
            this.label4.Tag = "description";
            this.label4.Text = "备注";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            this.label5.Location = new System.Drawing.Point(21, 79);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(140, 23);
            this.label5.TabIndex = 25;
            this.label5.Tag = "password";
            this.label5.Text = "密码";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label6
            // 
            this.label6.Location = new System.Drawing.Point(21, 35);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(140, 23);
            this.label6.TabIndex = 24;
            this.label6.Tag = "account";
            this.label6.Text = "账户";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // txtDescription
            // 
            this.txtDescription.Location = new System.Drawing.Point(188, 228);
            this.txtDescription.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.txtDescription.Multiline = true;
            this.txtDescription.Name = "txtDescription";
            this.txtDescription.PasswordChar = 'X';
            this.txtDescription.Size = new System.Drawing.Size(342, 105);
            this.txtDescription.TabIndex = 31;
            this.txtDescription.UseSystemPasswordChar = true;
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(188, 79);
            this.txtPassword.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.Size = new System.Drawing.Size(268, 26);
            this.txtPassword.TabIndex = 17;
            // 
            // label2
            // 
            this.label2.Location = new System.Drawing.Point(21, 127);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(140, 23);
            this.label2.TabIndex = 28;
            this.label2.Tag = "role";
            this.label2.Text = "角色";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // txtRole
            // 
            this.txtRole.Location = new System.Drawing.Point(188, 127);
            this.txtRole.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.txtRole.Name = "txtRole";
            this.txtRole.Size = new System.Drawing.Size(268, 26);
            this.txtRole.TabIndex = 29;
            // 
            // NewAccount
            // 
            this.AcceptButton = this.Btn_OK;
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.Btn_Cancel;
            this.ClientSize = new System.Drawing.Size(594, 432);
            this.Controls.Add(this.txtRole);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtAccount);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.comboBoxServer);
            this.Controls.Add(this.Btn_Cancel);
            this.Controls.Add(this.Btn_OK);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.txtDescription);
            this.Controls.Add(this.txtPassword);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "NewAccount";
            this.ShowIcon = false;
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Tag = "account";
            this.Text = "账户";
            this.Load += new System.EventHandler(this.NewAccount_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtAccount;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox comboBoxServer;
        private System.Windows.Forms.Button Btn_Cancel;
        private System.Windows.Forms.Button Btn_OK;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox txtDescription;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtRole;
    }
}