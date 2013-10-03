namespace sgll.net.DockingPanel
{
    partial class CardSalePanel
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
            this.checkBoxLevel1Only = new System.Windows.Forms.CheckBox();
            this.buttonApply = new System.Windows.Forms.Button();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.checkBoxQun = new System.Windows.Forms.CheckBox();
            this.checkBoxWu = new System.Windows.Forms.CheckBox();
            this.checkBoxShu = new System.Windows.Forms.CheckBox();
            this.checkBoxArmor = new System.Windows.Forms.CheckBox();
            this.checkBoxWeapon = new System.Windows.Forms.CheckBox();
            this.checkBoxHorse = new System.Windows.Forms.CheckBox();
            this.checkBoxHan = new System.Windows.Forms.CheckBox();
            this.checkBoxJin = new System.Windows.Forms.CheckBox();
            this.checkBoxWei = new System.Windows.Forms.CheckBox();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.checkBoxThreeStar = new System.Windows.Forms.CheckBox();
            this.checkBoxTwoStar = new System.Windows.Forms.CheckBox();
            this.checkBoxOneStar = new System.Windows.Forms.CheckBox();
            this.label1 = new System.Windows.Forms.Label();
            this.labelExclude = new System.Windows.Forms.Label();
            this.startStop1 = new sgll.net.StartStop();
            this.groupBox1.SuspendLayout();
            this.tableLayoutPanel1.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.checkBoxLevel1Only);
            this.groupBox1.Controls.Add(this.buttonApply);
            this.groupBox1.Controls.Add(this.startStop1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox1.Location = new System.Drawing.Point(0, 174);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(469, 85);
            this.groupBox1.TabIndex = 1;
            this.groupBox1.TabStop = false;
            // 
            // checkBoxLevel1Only
            // 
            this.checkBoxLevel1Only.AutoSize = true;
            this.checkBoxLevel1Only.Checked = true;
            this.checkBoxLevel1Only.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxLevel1Only.Location = new System.Drawing.Point(6, 20);
            this.checkBoxLevel1Only.Name = "checkBoxLevel1Only";
            this.checkBoxLevel1Only.Size = new System.Drawing.Size(120, 16);
            this.checkBoxLevel1Only.TabIndex = 4;
            this.checkBoxLevel1Only.Text = "只卖没强化过的卡";
            this.checkBoxLevel1Only.UseVisualStyleBackColor = true;
            // 
            // buttonApply
            // 
            this.buttonApply.Location = new System.Drawing.Point(4, 48);
            this.buttonApply.Name = "buttonApply";
            this.buttonApply.Size = new System.Drawing.Size(75, 23);
            this.buttonApply.TabIndex = 1;
            this.buttonApply.Text = "应用";
            this.buttonApply.UseVisualStyleBackColor = true;
            this.buttonApply.Click += new System.EventHandler(this.buttonApply_Click);
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 70F));
            this.tableLayoutPanel1.Controls.Add(this.groupBox3, 1, 0);
            this.tableLayoutPanel1.Controls.Add(this.groupBox2, 0, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(469, 174);
            this.tableLayoutPanel1.TabIndex = 2;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.labelExclude);
            this.groupBox3.Controls.Add(this.checkBoxQun);
            this.groupBox3.Controls.Add(this.checkBoxWu);
            this.groupBox3.Controls.Add(this.checkBoxShu);
            this.groupBox3.Controls.Add(this.checkBoxArmor);
            this.groupBox3.Controls.Add(this.checkBoxWeapon);
            this.groupBox3.Controls.Add(this.checkBoxHorse);
            this.groupBox3.Controls.Add(this.checkBoxHan);
            this.groupBox3.Controls.Add(this.checkBoxJin);
            this.groupBox3.Controls.Add(this.checkBoxWei);
            this.groupBox3.Controls.Add(this.label2);
            this.groupBox3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox3.Location = new System.Drawing.Point(143, 3);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(323, 168);
            this.groupBox3.TabIndex = 1;
            this.groupBox3.TabStop = false;
            // 
            // checkBoxQun
            // 
            this.checkBoxQun.AutoSize = true;
            this.checkBoxQun.Checked = true;
            this.checkBoxQun.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxQun.Location = new System.Drawing.Point(141, 58);
            this.checkBoxQun.Name = "checkBoxQun";
            this.checkBoxQun.Size = new System.Drawing.Size(72, 16);
            this.checkBoxQun.TabIndex = 10;
            this.checkBoxQun.Text = "群雄武将";
            this.checkBoxQun.UseVisualStyleBackColor = true;
            // 
            // checkBoxWu
            // 
            this.checkBoxWu.AutoSize = true;
            this.checkBoxWu.Checked = true;
            this.checkBoxWu.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxWu.Location = new System.Drawing.Point(18, 58);
            this.checkBoxWu.Name = "checkBoxWu";
            this.checkBoxWu.Size = new System.Drawing.Size(72, 16);
            this.checkBoxWu.TabIndex = 9;
            this.checkBoxWu.Text = "吴国武将";
            this.checkBoxWu.UseVisualStyleBackColor = true;
            // 
            // checkBoxShu
            // 
            this.checkBoxShu.AutoSize = true;
            this.checkBoxShu.Checked = true;
            this.checkBoxShu.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxShu.Location = new System.Drawing.Point(141, 36);
            this.checkBoxShu.Name = "checkBoxShu";
            this.checkBoxShu.Size = new System.Drawing.Size(72, 16);
            this.checkBoxShu.TabIndex = 8;
            this.checkBoxShu.Text = "蜀国武将";
            this.checkBoxShu.UseVisualStyleBackColor = true;
            // 
            // checkBoxArmor
            // 
            this.checkBoxArmor.AutoSize = true;
            this.checkBoxArmor.Checked = true;
            this.checkBoxArmor.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxArmor.Location = new System.Drawing.Point(141, 102);
            this.checkBoxArmor.Name = "checkBoxArmor";
            this.checkBoxArmor.Size = new System.Drawing.Size(48, 16);
            this.checkBoxArmor.TabIndex = 7;
            this.checkBoxArmor.Text = "防具";
            this.checkBoxArmor.UseVisualStyleBackColor = true;
            // 
            // checkBoxWeapon
            // 
            this.checkBoxWeapon.AutoSize = true;
            this.checkBoxWeapon.Checked = true;
            this.checkBoxWeapon.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxWeapon.Location = new System.Drawing.Point(18, 102);
            this.checkBoxWeapon.Name = "checkBoxWeapon";
            this.checkBoxWeapon.Size = new System.Drawing.Size(48, 16);
            this.checkBoxWeapon.TabIndex = 6;
            this.checkBoxWeapon.Text = "武器";
            this.checkBoxWeapon.UseVisualStyleBackColor = true;
            // 
            // checkBoxHorse
            // 
            this.checkBoxHorse.AutoSize = true;
            this.checkBoxHorse.Checked = true;
            this.checkBoxHorse.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxHorse.Location = new System.Drawing.Point(18, 124);
            this.checkBoxHorse.Name = "checkBoxHorse";
            this.checkBoxHorse.Size = new System.Drawing.Size(48, 16);
            this.checkBoxHorse.TabIndex = 5;
            this.checkBoxHorse.Text = "坐骑";
            this.checkBoxHorse.UseVisualStyleBackColor = true;
            // 
            // checkBoxHan
            // 
            this.checkBoxHan.AutoSize = true;
            this.checkBoxHan.Location = new System.Drawing.Point(141, 80);
            this.checkBoxHan.Name = "checkBoxHan";
            this.checkBoxHan.Size = new System.Drawing.Size(72, 16);
            this.checkBoxHan.TabIndex = 4;
            this.checkBoxHan.Text = "东汉武将";
            this.checkBoxHan.UseVisualStyleBackColor = true;
            // 
            // checkBoxJin
            // 
            this.checkBoxJin.AutoSize = true;
            this.checkBoxJin.Location = new System.Drawing.Point(18, 80);
            this.checkBoxJin.Name = "checkBoxJin";
            this.checkBoxJin.Size = new System.Drawing.Size(72, 16);
            this.checkBoxJin.TabIndex = 3;
            this.checkBoxJin.Text = "晋国武将";
            this.checkBoxJin.UseVisualStyleBackColor = true;
            // 
            // checkBoxWei
            // 
            this.checkBoxWei.AutoSize = true;
            this.checkBoxWei.Checked = true;
            this.checkBoxWei.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxWei.Location = new System.Drawing.Point(18, 36);
            this.checkBoxWei.Name = "checkBoxWei";
            this.checkBoxWei.Size = new System.Drawing.Size(72, 16);
            this.checkBoxWei.TabIndex = 2;
            this.checkBoxWei.Text = "魏国武将";
            this.checkBoxWei.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(16, 17);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(65, 12);
            this.label2.TabIndex = 1;
            this.label2.Text = "卡片种类：";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.checkBoxThreeStar);
            this.groupBox2.Controls.Add(this.checkBoxTwoStar);
            this.groupBox2.Controls.Add(this.checkBoxOneStar);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox2.Location = new System.Drawing.Point(3, 3);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(134, 168);
            this.groupBox2.TabIndex = 0;
            this.groupBox2.TabStop = false;
            // 
            // checkBoxThreeStar
            // 
            this.checkBoxThreeStar.AutoSize = true;
            this.checkBoxThreeStar.Location = new System.Drawing.Point(12, 93);
            this.checkBoxThreeStar.Name = "checkBoxThreeStar";
            this.checkBoxThreeStar.Size = new System.Drawing.Size(48, 16);
            this.checkBoxThreeStar.TabIndex = 3;
            this.checkBoxThreeStar.Text = "三星";
            this.checkBoxThreeStar.UseVisualStyleBackColor = true;
            // 
            // checkBoxTwoStar
            // 
            this.checkBoxTwoStar.AutoSize = true;
            this.checkBoxTwoStar.Checked = true;
            this.checkBoxTwoStar.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTwoStar.Location = new System.Drawing.Point(12, 71);
            this.checkBoxTwoStar.Name = "checkBoxTwoStar";
            this.checkBoxTwoStar.Size = new System.Drawing.Size(48, 16);
            this.checkBoxTwoStar.TabIndex = 2;
            this.checkBoxTwoStar.Text = "二星";
            this.checkBoxTwoStar.UseVisualStyleBackColor = true;
            // 
            // checkBoxOneStar
            // 
            this.checkBoxOneStar.AutoSize = true;
            this.checkBoxOneStar.Checked = true;
            this.checkBoxOneStar.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxOneStar.Location = new System.Drawing.Point(12, 49);
            this.checkBoxOneStar.Name = "checkBoxOneStar";
            this.checkBoxOneStar.Size = new System.Drawing.Size(48, 16);
            this.checkBoxOneStar.TabIndex = 1;
            this.checkBoxOneStar.Text = "一星";
            this.checkBoxOneStar.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 21);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(59, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "选择星级:";
            // 
            // labelExclude
            // 
            this.labelExclude.AutoSize = true;
            this.labelExclude.Location = new System.Drawing.Point(6, 153);
            this.labelExclude.Name = "labelExclude";
            this.labelExclude.Size = new System.Drawing.Size(317, 12);
            this.labelExclude.TabIndex = 11;
            this.labelExclude.Text = "保留卡片：蒋干，蒙古马，超级蒋干，超级蒙古马，龙渊剑";
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(94, 45);
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
            // CardSalePanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(469, 259);
            this.ControlBox = false;
            this.Controls.Add(this.tableLayoutPanel1);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "CardSalePanel";
            this.ShowIcon = false;
            this.Text = "卖卡";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.tableLayoutPanel1.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button buttonApply;
        private StartStop startStop1;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox checkBoxArmor;
        private System.Windows.Forms.CheckBox checkBoxWeapon;
        private System.Windows.Forms.CheckBox checkBoxHorse;
        private System.Windows.Forms.CheckBox checkBoxHan;
        private System.Windows.Forms.CheckBox checkBoxJin;
        private System.Windows.Forms.CheckBox checkBoxWei;
        private System.Windows.Forms.CheckBox checkBoxThreeStar;
        private System.Windows.Forms.CheckBox checkBoxTwoStar;
        private System.Windows.Forms.CheckBox checkBoxOneStar;
        private System.Windows.Forms.CheckBox checkBoxLevel1Only;
        private System.Windows.Forms.CheckBox checkBoxQun;
        private System.Windows.Forms.CheckBox checkBoxWu;
        private System.Windows.Forms.CheckBox checkBoxShu;
        private System.Windows.Forms.Label labelExclude;
    }
}