namespace sgll.net.DockingPanel
{
    partial class ForceBossPanel
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
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.labelBossTimeOut = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.labelAttackTimeout = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.labelFree = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.labelLeft = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.checkBoxUse = new System.Windows.Forms.CheckBox();
            this.startStop1 = new sgll.net.StartStop();
            this.labelTiliLeft = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(246, 299);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Location = new System.Drawing.Point(3, 17);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(77, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "未进行势力战";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.labelBossTimeOut);
            this.groupBox2.Controls.Add(this.label5);
            this.groupBox2.Controls.Add(this.labelAttackTimeout);
            this.groupBox2.Controls.Add(this.label3);
            this.groupBox2.Controls.Add(this.labelFree);
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.labelLeft);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Location = new System.Drawing.Point(0, 79);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(200, 143);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Visible = false;
            // 
            // labelBossTimeOut
            // 
            this.labelBossTimeOut.AutoSize = true;
            this.labelBossTimeOut.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelBossTimeOut.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.labelBossTimeOut.Location = new System.Drawing.Point(91, 42);
            this.labelBossTimeOut.Name = "labelBossTimeOut";
            this.labelBossTimeOut.Size = new System.Drawing.Size(61, 12);
            this.labelBossTimeOut.TabIndex = 8;
            this.labelBossTimeOut.Text = "--:--:--";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(5, 42);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(89, 12);
            this.label5.TabIndex = 7;
            this.label5.Text = "挑战剩余时间：";
            // 
            // labelAttackTimeout
            // 
            this.labelAttackTimeout.AutoSize = true;
            this.labelAttackTimeout.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelAttackTimeout.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.labelAttackTimeout.Location = new System.Drawing.Point(70, 98);
            this.labelAttackTimeout.Name = "labelAttackTimeout";
            this.labelAttackTimeout.Size = new System.Drawing.Size(61, 12);
            this.labelAttackTimeout.TabIndex = 6;
            this.labelAttackTimeout.Text = "--:--:--";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(5, 98);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(59, 12);
            this.label3.TabIndex = 5;
            this.label3.Text = "冷却时间:";
            // 
            // labelFree
            // 
            this.labelFree.AutoSize = true;
            this.labelFree.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelFree.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.labelFree.Location = new System.Drawing.Point(101, 73);
            this.labelFree.Name = "labelFree";
            this.labelFree.Size = new System.Drawing.Size(12, 12);
            this.labelFree.TabIndex = 4;
            this.labelFree.Text = "0";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(3, 73);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(83, 12);
            this.label4.TabIndex = 3;
            this.label4.Text = "免费攻击次数:";
            // 
            // labelLeft
            // 
            this.labelLeft.AutoSize = true;
            this.labelLeft.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelLeft.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.labelLeft.Location = new System.Drawing.Point(150, 17);
            this.labelLeft.Name = "labelLeft";
            this.labelLeft.Size = new System.Drawing.Size(33, 12);
            this.labelLeft.TabIndex = 2;
            this.labelLeft.Text = "1111";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Location = new System.Drawing.Point(3, 17);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(149, 12);
            this.label2.TabIndex = 1;
            this.label2.Text = "势力战进行中,剩余黄巾军:";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.labelTiliLeft);
            this.groupBox3.Controls.Add(this.checkBoxUse);
            this.groupBox3.Controls.Add(this.startStop1);
            this.groupBox3.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox3.Location = new System.Drawing.Point(0, 228);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(246, 71);
            this.groupBox3.TabIndex = 2;
            this.groupBox3.TabStop = false;
            // 
            // checkBoxUse
            // 
            this.checkBoxUse.AutoSize = true;
            this.checkBoxUse.Checked = true;
            this.checkBoxUse.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxUse.Location = new System.Drawing.Point(7, 21);
            this.checkBoxUse.Name = "checkBoxUse";
            this.checkBoxUse.Size = new System.Drawing.Size(108, 16);
            this.checkBoxUse.TabIndex = 1;
            this.checkBoxUse.Text = "自动使用体力丹";
            this.checkBoxUse.UseVisualStyleBackColor = true;
            this.checkBoxUse.CheckedChanged += new System.EventHandler(this.checkBoxUse_CheckedChanged);
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(0, 43);
            this.startStop1.Name = "startStop1";
            this.startStop1.OnStart = null;
            this.startStop1.OnStop = null;
            this.startStop1.Qid = 0;
            this.startStop1.SGLL = null;
            this.startStop1.Size = new System.Drawing.Size(171, 28);
            this.startStop1.StatusUpdate = sgll.net.Core.ChangedType.None;
            this.startStop1.TabIndex = 0;
            this.startStop1.TextControl = null;
            // 
            // labelTiliLeft
            // 
            this.labelTiliLeft.AutoSize = true;
            this.labelTiliLeft.ForeColor = System.Drawing.Color.LightPink;
            this.labelTiliLeft.Location = new System.Drawing.Point(121, 22);
            this.labelTiliLeft.Name = "labelTiliLeft";
            this.labelTiliLeft.Size = new System.Drawing.Size(0, 12);
            this.labelTiliLeft.TabIndex = 2;
            // 
            // ForceBossPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(246, 299);
            this.ControlBox = false;
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "ForceBossPanel";
            this.ShowIcon = false;
            this.Text = "势力Boss";
            this.Load += new System.EventHandler(this.ForceBossPanel_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.GroupBox groupBox3;
        private StartStop startStop1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label labelLeft;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label labelFree;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label labelAttackTimeout;
        private System.Windows.Forms.CheckBox checkBoxUse;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label labelBossTimeOut;
        private System.Windows.Forms.Label labelTiliLeft;
    }
}