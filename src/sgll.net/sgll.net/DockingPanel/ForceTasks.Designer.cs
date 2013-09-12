namespace sgll.net.DockingPanel
{
    partial class ForceTasks
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
            this.checkBoxRefresh = new System.Windows.Forms.CheckBox();
            this.buttonStart = new System.Windows.Forms.Button();
            this.buttonStop = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.labelTip = new System.Windows.Forms.Label();
            this.listViewEx1 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // checkBoxRefresh
            // 
            this.checkBoxRefresh.AutoSize = true;
            this.checkBoxRefresh.Checked = true;
            this.checkBoxRefresh.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxRefresh.Location = new System.Drawing.Point(10, 16);
            this.checkBoxRefresh.Name = "checkBoxRefresh";
            this.checkBoxRefresh.Size = new System.Drawing.Size(120, 16);
            this.checkBoxRefresh.TabIndex = 6;
            this.checkBoxRefresh.Text = "自动接受官员刷新";
            this.checkBoxRefresh.UseVisualStyleBackColor = true;
            this.checkBoxRefresh.CheckedChanged += new System.EventHandler(this.checkBoxRefresh_CheckedChanged);
            // 
            // buttonStart
            // 
            this.buttonStart.Location = new System.Drawing.Point(9, 38);
            this.buttonStart.Name = "buttonStart";
            this.buttonStart.Size = new System.Drawing.Size(75, 23);
            this.buttonStart.TabIndex = 7;
            this.buttonStart.Text = "开始";
            this.buttonStart.UseVisualStyleBackColor = true;
            this.buttonStart.Click += new System.EventHandler(this.buttonStart_Click);
            // 
            // buttonStop
            // 
            this.buttonStop.Enabled = false;
            this.buttonStop.Location = new System.Drawing.Point(101, 38);
            this.buttonStop.Name = "buttonStop";
            this.buttonStop.Size = new System.Drawing.Size(75, 23);
            this.buttonStop.TabIndex = 8;
            this.buttonStop.Text = "停止";
            this.buttonStop.UseVisualStyleBackColor = true;
            this.buttonStop.Click += new System.EventHandler(this.buttonStop_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.labelTip);
            this.groupBox1.Controls.Add(this.buttonStop);
            this.groupBox1.Controls.Add(this.checkBoxRefresh);
            this.groupBox1.Controls.Add(this.buttonStart);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox1.Location = new System.Drawing.Point(0, 220);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(314, 66);
            this.groupBox1.TabIndex = 10;
            this.groupBox1.TabStop = false;
            // 
            // labelTip
            // 
            this.labelTip.AutoSize = true;
            this.labelTip.ForeColor = System.Drawing.Color.Red;
            this.labelTip.Location = new System.Drawing.Point(136, 17);
            this.labelTip.Name = "labelTip";
            this.labelTip.Size = new System.Drawing.Size(101, 12);
            this.labelTip.TabIndex = 9;
            this.labelTip.Text = "提示：官员已刷新";
            this.labelTip.Visible = false;
            // 
            // listViewEx1
            // 
            this.listViewEx1.AllowColumnReorder = true;
            this.listViewEx1.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3});
            this.listViewEx1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listViewEx1.FullRowSelect = true;
            this.listViewEx1.GridLines = true;
            this.listViewEx1.HeaderStyle = System.Windows.Forms.ColumnHeaderStyle.Nonclickable;
            this.listViewEx1.Location = new System.Drawing.Point(0, 0);
            this.listViewEx1.Name = "listViewEx1";
            this.listViewEx1.Size = new System.Drawing.Size(314, 220);
            this.listViewEx1.TabIndex = 11;
            this.listViewEx1.UseCompatibleStateImageBehavior = false;
            this.listViewEx1.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "内政";
            this.columnHeader1.Width = 93;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "进度";
            this.columnHeader2.Width = 113;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "冷却时间";
            // 
            // ForceTasks
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(314, 286);
            this.CloseButton = false;
            this.CloseButtonVisible = false;
            this.ControlBox = false;
            this.Controls.Add(this.listViewEx1);
            this.Controls.Add(this.groupBox1);
            this.DockAreas = ((WeifenLuo.WinFormsUI.Docking.DockAreas)(((((WeifenLuo.WinFormsUI.Docking.DockAreas.DockLeft | WeifenLuo.WinFormsUI.Docking.DockAreas.DockRight) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.DockTop) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.DockBottom) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.Document)));
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "ForceTasks";
            this.ShowHint = WeifenLuo.WinFormsUI.Docking.DockState.Document;
            this.ShowIcon = false;
            this.Text = "内政";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.CheckBox checkBoxRefresh;
        private System.Windows.Forms.Button buttonStart;
        private System.Windows.Forms.Button buttonStop;
        private System.Windows.Forms.GroupBox groupBox1;
        public ListViewEmbeddedControls.ListViewEx listViewEx1;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private System.Windows.Forms.ColumnHeader columnHeader3;
        private System.Windows.Forms.Label labelTip;
    }
}