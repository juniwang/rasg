namespace sgll.net.DockingPanel
{
    partial class ActivityPanel
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
            this.checkBoxEveryDay = new System.Windows.Forms.CheckBox();
            this.startStop1 = new sgll.net.StartStop();
            this.checkBoxBuyJM = new System.Windows.Forms.CheckBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.listViewEx1 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader5 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.checkBoxEveryDay);
            this.groupBox1.Controls.Add(this.startStop1);
            this.groupBox1.Controls.Add(this.checkBoxBuyJM);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox1.Location = new System.Drawing.Point(0, 239);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(439, 86);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            // 
            // checkBoxEveryDay
            // 
            this.checkBoxEveryDay.AutoSize = true;
            this.checkBoxEveryDay.Location = new System.Drawing.Point(6, 42);
            this.checkBoxEveryDay.Name = "checkBoxEveryDay";
            this.checkBoxEveryDay.Size = new System.Drawing.Size(120, 16);
            this.checkBoxEveryDay.TabIndex = 2;
            this.checkBoxEveryDay.Text = "每日三星兑换活动";
            this.checkBoxEveryDay.UseVisualStyleBackColor = true;
            this.checkBoxEveryDay.CheckedChanged += new System.EventHandler(this.checkBoxEveryDay_CheckedChanged);
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(6, 56);
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
            // checkBoxBuyJM
            // 
            this.checkBoxBuyJM.AutoSize = true;
            this.checkBoxBuyJM.Checked = true;
            this.checkBoxBuyJM.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxBuyJM.Location = new System.Drawing.Point(6, 20);
            this.checkBoxBuyJM.Name = "checkBoxBuyJM";
            this.checkBoxBuyJM.Size = new System.Drawing.Size(144, 16);
            this.checkBoxBuyJM.TabIndex = 0;
            this.checkBoxBuyJM.Text = "自动购买蒋干和蒙古马";
            this.checkBoxBuyJM.UseVisualStyleBackColor = true;
            this.checkBoxBuyJM.CheckedChanged += new System.EventHandler(this.checkBoxBuyJM_CheckedChanged);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.listViewEx1);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox2.Location = new System.Drawing.Point(0, 0);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(439, 239);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            // 
            // listViewEx1
            // 
            this.listViewEx1.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3,
            this.columnHeader4,
            this.columnHeader5});
            this.listViewEx1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listViewEx1.GridLines = true;
            this.listViewEx1.Location = new System.Drawing.Point(3, 29);
            this.listViewEx1.Name = "listViewEx1";
            this.listViewEx1.Size = new System.Drawing.Size(433, 207);
            this.listViewEx1.TabIndex = 1;
            this.listViewEx1.UseCompatibleStateImageBehavior = false;
            this.listViewEx1.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "活动";
            this.columnHeader1.Width = 123;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "奖励";
            this.columnHeader2.Width = 94;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "状态";
            this.columnHeader3.Width = 64;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "冷却";
            this.columnHeader4.Width = 68;
            // 
            // columnHeader5
            // 
            this.columnHeader5.Text = "获得";
            this.columnHeader5.Width = 75;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Dock = System.Windows.Forms.DockStyle.Top;
            this.label1.Location = new System.Drawing.Point(3, 17);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(323, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "包括：活动碎片变碎为宝；蒋干+蒙古马兑换；每日三星兑换";
            // 
            // ActivityPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(439, 325);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "ActivityPanel";
            this.Text = "活动中心";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.CheckBox checkBoxBuyJM;
        private StartStop startStop1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox checkBoxEveryDay;
        private ListViewEmbeddedControls.ListViewEx listViewEx1;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private System.Windows.Forms.ColumnHeader columnHeader3;
        private System.Windows.Forms.ColumnHeader columnHeader4;
        private System.Windows.Forms.ColumnHeader columnHeader5;
    }
}