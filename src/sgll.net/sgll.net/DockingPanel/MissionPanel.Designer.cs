namespace sgll.net.DockingPanel
{
    partial class MissionPanel
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
            this.labelScenario = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.startStop1 = new sgll.net.StartStop();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.listViewEx1 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.listViewEx2 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader5 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.labelScenario);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(375, 42);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            // 
            // labelScenario
            // 
            this.labelScenario.AutoSize = true;
            this.labelScenario.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelScenario.Font = new System.Drawing.Font("SimSun", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelScenario.ForeColor = System.Drawing.SystemColors.HotTrack;
            this.labelScenario.Location = new System.Drawing.Point(3, 17);
            this.labelScenario.Name = "labelScenario";
            this.labelScenario.Size = new System.Drawing.Size(42, 16);
            this.labelScenario.TabIndex = 0;
            this.labelScenario.Text = "涿郡";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.startStop1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox2.Location = new System.Drawing.Point(0, 244);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(375, 54);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            // 
            // startStop1
            // 
            this.startStop1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.startStop1.Location = new System.Drawing.Point(3, 17);
            this.startStop1.Name = "startStop1";
            this.startStop1.OnStart = null;
            this.startStop1.OnStop = null;
            this.startStop1.Qid = 0;
            this.startStop1.SGLL = null;
            this.startStop1.Size = new System.Drawing.Size(369, 34);
            this.startStop1.StatusUpdate = sgll.net.Core.ChangedType.None;
            this.startStop1.TabIndex = 0;
            this.startStop1.TextControl = null;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.listViewEx2);
            this.groupBox3.Controls.Add(this.listViewEx1);
            this.groupBox3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox3.Location = new System.Drawing.Point(0, 42);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(0);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(0);
            this.groupBox3.Size = new System.Drawing.Size(375, 202);
            this.groupBox3.TabIndex = 2;
            this.groupBox3.TabStop = false;
            // 
            // listViewEx1
            // 
            this.listViewEx1.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2});
            this.listViewEx1.Dock = System.Windows.Forms.DockStyle.Left;
            this.listViewEx1.GridLines = true;
            this.listViewEx1.Location = new System.Drawing.Point(0, 14);
            this.listViewEx1.Name = "listViewEx1";
            this.listViewEx1.Size = new System.Drawing.Size(153, 188);
            this.listViewEx1.TabIndex = 0;
            this.listViewEx1.UseCompatibleStateImageBehavior = false;
            this.listViewEx1.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "关卡";
            this.columnHeader1.Width = 85;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "难度";
            // 
            // listViewEx2
            // 
            this.listViewEx2.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader3,
            this.columnHeader4,
            this.columnHeader5});
            this.listViewEx2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listViewEx2.GridLines = true;
            this.listViewEx2.Location = new System.Drawing.Point(153, 14);
            this.listViewEx2.Margin = new System.Windows.Forms.Padding(0);
            this.listViewEx2.Name = "listViewEx2";
            this.listViewEx2.Size = new System.Drawing.Size(222, 188);
            this.listViewEx2.TabIndex = 1;
            this.listViewEx2.UseCompatibleStateImageBehavior = false;
            this.listViewEx2.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "小关";
            this.columnHeader3.Width = 65;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "消耗精力";
            // 
            // columnHeader5
            // 
            this.columnHeader5.Text = "进度";
            // 
            // MissionPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(375, 298);
            this.ControlBox = false;
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "MissionPanel";
            this.ShowIcon = false;
            this.Text = "任务";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label labelScenario;
        private System.Windows.Forms.GroupBox groupBox2;
        private StartStop startStop1;
        private System.Windows.Forms.GroupBox groupBox3;
        private ListViewEmbeddedControls.ListViewEx listViewEx1;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private ListViewEmbeddedControls.ListViewEx listViewEx2;
        private System.Windows.Forms.ColumnHeader columnHeader3;
        private System.Windows.Forms.ColumnHeader columnHeader4;
        private System.Windows.Forms.ColumnHeader columnHeader5;
    }
}