namespace sgll.net.DockingPanel
{
    partial class MoneyMonitorPanel
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
            this.buttonSetPara = new System.Windows.Forms.Button();
            this.startStop1 = new sgll.net.StartStop();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.comboBoxAddMoney = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.textBoxAddLine = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.comboBoxSubMoney = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.textBoxSubLine = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.buttonSetPara);
            this.groupBox1.Controls.Add(this.startStop1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox1.Location = new System.Drawing.Point(0, 149);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(350, 47);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            // 
            // buttonSetPara
            // 
            this.buttonSetPara.Location = new System.Drawing.Point(7, 16);
            this.buttonSetPara.Name = "buttonSetPara";
            this.buttonSetPara.Size = new System.Drawing.Size(75, 23);
            this.buttonSetPara.TabIndex = 1;
            this.buttonSetPara.Text = "应用";
            this.buttonSetPara.UseVisualStyleBackColor = true;
            this.buttonSetPara.Click += new System.EventHandler(this.buttonSetPara_Click);
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(97, 13);
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
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.comboBoxAddMoney);
            this.groupBox2.Controls.Add(this.label3);
            this.groupBox2.Controls.Add(this.textBoxAddLine);
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.comboBoxSubMoney);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Controls.Add(this.textBoxSubLine);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox2.Location = new System.Drawing.Point(0, 0);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(350, 149);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            // 
            // comboBoxAddMoney
            // 
            this.comboBoxAddMoney.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxAddMoney.FormattingEnabled = true;
            this.comboBoxAddMoney.Items.AddRange(new object[] {
            "钱箱",
            "钱袋"});
            this.comboBoxAddMoney.Location = new System.Drawing.Point(194, 88);
            this.comboBoxAddMoney.Name = "comboBoxAddMoney";
            this.comboBoxAddMoney.Size = new System.Drawing.Size(113, 20);
            this.comboBoxAddMoney.TabIndex = 7;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(145, 91);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(53, 12);
            this.label3.TabIndex = 6;
            this.label3.Text = "时使用：";
            // 
            // textBoxAddLine
            // 
            this.textBoxAddLine.Location = new System.Drawing.Point(87, 88);
            this.textBoxAddLine.Name = "textBoxAddLine";
            this.textBoxAddLine.Size = new System.Drawing.Size(51, 21);
            this.textBoxAddLine.TabIndex = 5;
            this.textBoxAddLine.Text = "4000";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(25, 91);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(65, 12);
            this.label4.TabIndex = 4;
            this.label4.Text = "当银币小于";
            // 
            // comboBoxSubMoney
            // 
            this.comboBoxSubMoney.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxSubMoney.FormattingEnabled = true;
            this.comboBoxSubMoney.Items.AddRange(new object[] {
            "钱箱",
            "钱袋",
            "超级蒋干",
            "超级蒙古马"});
            this.comboBoxSubMoney.Location = new System.Drawing.Point(194, 35);
            this.comboBoxSubMoney.Name = "comboBoxSubMoney";
            this.comboBoxSubMoney.Size = new System.Drawing.Size(113, 20);
            this.comboBoxSubMoney.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(145, 38);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(53, 12);
            this.label2.TabIndex = 2;
            this.label2.Text = "时购买：";
            // 
            // textBoxSubLine
            // 
            this.textBoxSubLine.Location = new System.Drawing.Point(87, 35);
            this.textBoxSubLine.Name = "textBoxSubLine";
            this.textBoxSubLine.Size = new System.Drawing.Size(51, 21);
            this.textBoxSubLine.TabIndex = 1;
            this.textBoxSubLine.Text = "14000";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(25, 38);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "当银币大于";
            // 
            // MoneyMonitorPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(350, 196);
            this.ControlBox = false;
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "MoneyMonitorPanel";
            this.ShowIcon = false;
            this.Text = "银币管理";
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private StartStop startStop1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBoxSubLine;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox comboBoxSubMoney;
        private System.Windows.Forms.ComboBox comboBoxAddMoney;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textBoxAddLine;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button buttonSetPara;
    }
}