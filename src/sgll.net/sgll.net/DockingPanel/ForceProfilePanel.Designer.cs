namespace sgll.net.DockingPanel
{
    partial class ForceProfilePanel
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
            this.forceProfileLabel1 = new sgll.net.ForceProfileLabel();
            this.SuspendLayout();
            // 
            // forceProfileLabel1
            // 
            this.forceProfileLabel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.forceProfileLabel1.ForceProfile = null;
            this.forceProfileLabel1.Location = new System.Drawing.Point(0, 0);
            this.forceProfileLabel1.Name = "forceProfileLabel1";
            this.forceProfileLabel1.Size = new System.Drawing.Size(206, 264);
            this.forceProfileLabel1.TabIndex = 0;
            // 
            // ForceProfilePanel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(206, 264);
            this.CloseButton = false;
            this.CloseButtonVisible = false;
            this.ControlBox = false;
            this.Controls.Add(this.forceProfileLabel1);
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "ForceProfilePanel";
            this.ShowIcon = false;
            this.Text = "势力信息";
            this.ResumeLayout(false);

        }

        #endregion

        private ForceProfileLabel forceProfileLabel1;

    }
}