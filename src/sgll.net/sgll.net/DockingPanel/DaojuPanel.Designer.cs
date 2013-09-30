namespace sgll.net.DockingPanel
{
    partial class DaojuPanel
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
            this.daojuLabel1 = new sgll.net.DaojuLabel();
            this.SuspendLayout();
            // 
            // daojuLabel1
            // 
            this.daojuLabel1.Data = null;
            this.daojuLabel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.daojuLabel1.Location = new System.Drawing.Point(0, 0);
            this.daojuLabel1.Name = "daojuLabel1";
            this.daojuLabel1.Size = new System.Drawing.Size(279, 251);
            this.daojuLabel1.TabIndex = 0;
            // 
            // DaojuPanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(279, 251);
            this.ControlBox = false;
            this.Controls.Add(this.daojuLabel1);
            this.Name = "DaojuPanel";
            this.ShowIcon = false;
            this.Text = "道具";
            this.ResumeLayout(false);

        }

        #endregion

        private DaojuLabel daojuLabel1;
    }
}