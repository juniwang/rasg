namespace sgll.net.DockingPanel
{
    partial class PlayerStatus
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
            this.playInfoLabel1 = new sgll.net.PlayInfoLabel();
            this.SuspendLayout();
            // 
            // playInfoLabel1
            // 
            this.playInfoLabel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.playInfoLabel1.Location = new System.Drawing.Point(0, 0);
            this.playInfoLabel1.Name = "playInfoLabel1";
            this.playInfoLabel1.PlayerInfo = null;
            this.playInfoLabel1.Size = new System.Drawing.Size(227, 161);
            this.playInfoLabel1.TabIndex = 0;
            // 
            // PlayerStatus
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(227, 161);
            this.CloseButton = false;
            this.CloseButtonVisible = false;
            this.Controls.Add(this.playInfoLabel1);
            this.DockAreas = ((WeifenLuo.WinFormsUI.Docking.DockAreas)(((((WeifenLuo.WinFormsUI.Docking.DockAreas.DockLeft | WeifenLuo.WinFormsUI.Docking.DockAreas.DockRight) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.DockTop) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.DockBottom) 
            | WeifenLuo.WinFormsUI.Docking.DockAreas.Document)));
            this.Font = new System.Drawing.Font("SimSun", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Name = "PlayerStatus";
            this.ShowHint = WeifenLuo.WinFormsUI.Docking.DockState.Document;
            this.ShowIcon = false;
            this.TabText = "账户信息";
            this.Text = "账户信息";
            this.Load += new System.EventHandler(this.PlayerStatus_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private sgll.net.PlayInfoLabel playInfoLabel1;
    }
}