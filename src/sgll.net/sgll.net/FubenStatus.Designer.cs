namespace sgll.net
{
    partial class FubenStatus
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
            this.listViewEx1 = new ListViewEmbeddedControls.ListViewEx();
            this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.fubenGroupStatus1 = new sgll.net.FubenGroupStatus();
            this.SuspendLayout();
            // 
            // listViewEx1
            // 
            this.listViewEx1.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2});
            this.listViewEx1.Dock = System.Windows.Forms.DockStyle.Left;
            this.listViewEx1.GridLines = true;
            this.listViewEx1.Location = new System.Drawing.Point(0, 0);
            this.listViewEx1.Name = "listViewEx1";
            this.listViewEx1.Size = new System.Drawing.Size(113, 163);
            this.listViewEx1.TabIndex = 0;
            this.listViewEx1.UseCompatibleStateImageBehavior = false;
            this.listViewEx1.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "关卡";
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "状态";
            this.columnHeader2.Width = 48;
            // 
            // fubenGroupStatus1
            // 
            this.fubenGroupStatus1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.fubenGroupStatus1.Fuben = null;
            this.fubenGroupStatus1.Location = new System.Drawing.Point(113, 0);
            this.fubenGroupStatus1.Name = "fubenGroupStatus1";
            this.fubenGroupStatus1.Padding = new System.Windows.Forms.Padding(5, 0, 0, 0);
            this.fubenGroupStatus1.Size = new System.Drawing.Size(203, 163);
            this.fubenGroupStatus1.TabIndex = 1;
            // 
            // FubenStatus
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.fubenGroupStatus1);
            this.Controls.Add(this.listViewEx1);
            this.Name = "FubenStatus";
            this.Size = new System.Drawing.Size(316, 163);
            this.ResumeLayout(false);

        }

        #endregion

        private ListViewEmbeddedControls.ListViewEx listViewEx1;
        private System.Windows.Forms.ColumnHeader columnHeader1;
        private System.Windows.Forms.ColumnHeader columnHeader2;
        private FubenGroupStatus fubenGroupStatus1;
    }
}
