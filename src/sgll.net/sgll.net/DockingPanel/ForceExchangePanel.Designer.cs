namespace sgll.net.DockingPanel
{
    partial class ForceExchangePanel
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
            this.startStop1 = new sgll.net.StartStop();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.listViewEx1 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader5 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // startStop1
            // 
            this.startStop1.Location = new System.Drawing.Point(6, 11);
            this.startStop1.Name = "startStop1";
            this.startStop1.OnStart = null;
            this.startStop1.OnStop = null;
            this.startStop1.Qid = 0;
            this.startStop1.SGLL = null;
            this.startStop1.Size = new System.Drawing.Size(171, 28);
            this.startStop1.StatusUpdate = sgll.net.Core.ChangedType.None;
            this.startStop1.TabIndex = 13;
            this.startStop1.TextControl = null;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.startStop1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.groupBox2.Location = new System.Drawing.Point(0, 155);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(354, 44);
            this.groupBox2.TabIndex = 14;
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
            this.listViewEx1.Location = new System.Drawing.Point(0, 0);
            this.listViewEx1.Name = "listViewEx1";
            this.listViewEx1.Size = new System.Drawing.Size(354, 155);
            this.listViewEx1.TabIndex = 15;
            this.listViewEx1.UseCompatibleStateImageBehavior = false;
            this.listViewEx1.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "兑换";
            this.columnHeader1.Width = 123;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "自动";
            this.columnHeader2.Width = 43;
            // 
            // columnHeader5
            // 
            this.columnHeader5.Text = "上次获得";
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "粮食";
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "冷却";
            // 
            // ForceExchangePanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(354, 199);
            this.CloseButton = false;
            this.CloseButtonVisible = false;
            this.ControlBox = false;
            this.Controls.Add(this.listViewEx1);
            this.Controls.Add(this.groupBox2);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "ForceExchangePanel";
            this.ShowIcon = false;
            this.Text = "势力兑换";
            this.Load += new System.EventHandler(this.ForceZhufushiPanel_Load);
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private StartStop startStop1;
        private System.Windows.Forms.GroupBox groupBox2;
        private ListViewEmbeddedControls.ListViewEx listViewEx1;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private System.Windows.Forms.ColumnHeader columnHeader3;
        private System.Windows.Forms.ColumnHeader columnHeader4;
        private System.Windows.Forms.ColumnHeader columnHeader5;
    }
}