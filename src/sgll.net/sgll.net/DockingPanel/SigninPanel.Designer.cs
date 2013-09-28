namespace sgll.net.DockingPanel
{
    partial class SigninPanel
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
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.buttonSignin = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.labelCD = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.labelAward = new System.Windows.Forms.Label();
            this.labelStatus = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.startStop1 = new sgll.net.StartStop();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.startStop1);
            this.groupBox1.Controls.Add(this.buttonSignin);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox1.Location = new System.Drawing.Point(0, 115);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(284, 48);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            // 
            // buttonSignin
            // 
            this.buttonSignin.Enabled = false;
            this.buttonSignin.Location = new System.Drawing.Point(6, 18);
            this.buttonSignin.Name = "buttonSignin";
            this.buttonSignin.Size = new System.Drawing.Size(75, 23);
            this.buttonSignin.TabIndex = 0;
            this.buttonSignin.Text = "今日签到";
            this.buttonSignin.UseVisualStyleBackColor = true;
            this.buttonSignin.Click += new System.EventHandler(this.buttonSignin_Click);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.labelCD);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Controls.Add(this.labelAward);
            this.groupBox2.Controls.Add(this.labelStatus);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox2.Location = new System.Drawing.Point(0, 0);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(284, 115);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            // 
            // labelCD
            // 
            this.labelCD.AutoSize = true;
            this.labelCD.Font = new System.Drawing.Font("SimSun", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelCD.ForeColor = System.Drawing.SystemColors.HotTrack;
            this.labelCD.Location = new System.Drawing.Point(109, 84);
            this.labelCD.Name = "labelCD";
            this.labelCD.Size = new System.Drawing.Size(71, 14);
            this.labelCD.TabIndex = 4;
            this.labelCD.Text = "--:--:--";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(26, 86);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(77, 12);
            this.label2.TabIndex = 3;
            this.label2.Text = "下次刷新于：";
            // 
            // labelAward
            // 
            this.labelAward.AutoSize = true;
            this.labelAward.Location = new System.Drawing.Point(24, 53);
            this.labelAward.Name = "labelAward";
            this.labelAward.Size = new System.Drawing.Size(41, 12);
            this.labelAward.TabIndex = 2;
            this.labelAward.Text = "获得：";
            this.labelAward.Visible = false;
            // 
            // labelStatus
            // 
            this.labelStatus.AutoSize = true;
            this.labelStatus.Font = new System.Drawing.Font("SimSun", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelStatus.ForeColor = System.Drawing.SystemColors.HotTrack;
            this.labelStatus.Location = new System.Drawing.Point(87, 20);
            this.labelStatus.Name = "labelStatus";
            this.labelStatus.Size = new System.Drawing.Size(37, 14);
            this.labelStatus.TabIndex = 1;
            this.labelStatus.Text = "未知";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(22, 21);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "签到状态：";
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(87, 15);
            this.startStop1.Name = "startStop1";
            this.startStop1.OnStart = null;
            this.startStop1.OnStop = null;
            this.startStop1.Qid = 0;
            this.startStop1.SGLL = null;
            this.startStop1.Size = new System.Drawing.Size(171, 28);
            this.startStop1.StatusUpdate = sgll.net.Core.ChangedType.None;
            this.startStop1.TabIndex = 1;
            this.startStop1.TextControl = null;
            // 
            // SigninPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 163);
            this.ControlBox = false;
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "SigninPanel";
            this.ShowIcon = false;
            this.Text = "签到";
            this.Load += new System.EventHandler(this.SigninPanel_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private StartStop startStop1;
        private System.Windows.Forms.Button buttonSignin;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label labelStatus;
        private System.Windows.Forms.Label labelAward;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label labelCD;
    }
}