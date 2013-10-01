namespace sgll.net
{
    partial class AdvanceCall
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.textBoxUrl = new System.Windows.Forms.TextBox();
            this.textBoxParameters = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.textBoxTimes = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.textBoxResult = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.button1 = new System.Windows.Forms.Button();
            this.textBoxInterval = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.checkBoxAllUsers = new System.Windows.Forms.CheckBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(35, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "地址:";
            // 
            // textBoxUrl
            // 
            this.textBoxUrl.Location = new System.Drawing.Point(57, 22);
            this.textBoxUrl.Name = "textBoxUrl";
            this.textBoxUrl.Size = new System.Drawing.Size(408, 21);
            this.textBoxUrl.TabIndex = 1;
            this.textBoxUrl.Text = "/player/profile";
            // 
            // textBoxParameters
            // 
            this.textBoxParameters.Location = new System.Drawing.Point(57, 46);
            this.textBoxParameters.Name = "textBoxParameters";
            this.textBoxParameters.Size = new System.Drawing.Size(408, 21);
            this.textBoxParameters.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(10, 49);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 12);
            this.label2.TabIndex = 2;
            this.label2.Text = "参数:";
            // 
            // textBoxTimes
            // 
            this.textBoxTimes.Location = new System.Drawing.Point(75, 73);
            this.textBoxTimes.Name = "textBoxTimes";
            this.textBoxTimes.Size = new System.Drawing.Size(36, 21);
            this.textBoxTimes.TabIndex = 5;
            this.textBoxTimes.Text = "1";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(10, 77);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(59, 12);
            this.label3.TabIndex = 4;
            this.label3.Text = "执行次数:";
            // 
            // textBoxResult
            // 
            this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
            this.textBoxResult.Location = new System.Drawing.Point(3, 17);
            this.textBoxResult.Multiline = true;
            this.textBoxResult.Name = "textBoxResult";
            this.textBoxResult.Size = new System.Drawing.Size(493, 293);
            this.textBoxResult.TabIndex = 7;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.checkBoxAllUsers);
            this.groupBox1.Controls.Add(this.button1);
            this.groupBox1.Controls.Add(this.textBoxInterval);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.textBoxTimes);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.textBoxUrl);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.textBoxParameters);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(499, 138);
            this.groupBox1.TabIndex = 8;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "请求设置";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(12, 100);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(125, 23);
            this.button1.TabIndex = 8;
            this.button1.Text = "开始执行";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // textBoxInterval
            // 
            this.textBoxInterval.Location = new System.Drawing.Point(192, 74);
            this.textBoxInterval.Name = "textBoxInterval";
            this.textBoxInterval.Size = new System.Drawing.Size(101, 21);
            this.textBoxInterval.TabIndex = 7;
            this.textBoxInterval.Text = "1000";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(127, 77);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(59, 12);
            this.label4.TabIndex = 6;
            this.label4.Text = "间隔(ms):";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.textBoxResult);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox2.Location = new System.Drawing.Point(0, 138);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(499, 313);
            this.groupBox2.TabIndex = 9;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "输出";
            // 
            // checkBoxAllUsers
            // 
            this.checkBoxAllUsers.AutoSize = true;
            this.checkBoxAllUsers.Location = new System.Drawing.Point(311, 78);
            this.checkBoxAllUsers.Name = "checkBoxAllUsers";
            this.checkBoxAllUsers.Size = new System.Drawing.Size(156, 16);
            this.checkBoxAllUsers.TabIndex = 9;
            this.checkBoxAllUsers.Text = "同时在其他已登录号执行";
            this.checkBoxAllUsers.UseVisualStyleBackColor = true;
            // 
            // AdvanceCall
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Name = "AdvanceCall";
            this.Size = new System.Drawing.Size(499, 451);
            this.Load += new System.EventHandler(this.AdvanceCall_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBoxUrl;
        private System.Windows.Forms.TextBox textBoxParameters;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBoxTimes;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textBoxResult;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox textBoxInterval;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox checkBoxAllUsers;
    }
}
