namespace sgll.net
{
    partial class PlayInfoLabel
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
            this.labelNickname = new System.Windows.Forms.Label();
            this.labelRM = new System.Windows.Forms.Label();
            this.labelVM = new System.Windows.Forms.Label();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.labelLevel = new System.Windows.Forms.Label();
            this.labelaExp = new System.Windows.Forms.Label();
            this.labelStamima = new System.Windows.Forms.Label();
            this.labelEnergy = new System.Windows.Forms.Label();
            this.labelCard = new System.Windows.Forms.Label();
            this.labelGrain = new System.Windows.Forms.Label();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // labelNickname
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.labelNickname, 2);
            this.labelNickname.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelNickname.Font = new System.Drawing.Font("Tahoma", 10F, System.Drawing.FontStyle.Bold);
            this.labelNickname.Location = new System.Drawing.Point(3, 0);
            this.labelNickname.Name = "labelNickname";
            this.labelNickname.Size = new System.Drawing.Size(154, 42);
            this.labelNickname.TabIndex = 0;
            this.labelNickname.Text = "----";
            this.labelNickname.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelRM
            // 
            this.labelRM.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelRM.Location = new System.Drawing.Point(83, 42);
            this.labelRM.Name = "labelRM";
            this.labelRM.Size = new System.Drawing.Size(74, 34);
            this.labelRM.TabIndex = 4;
            this.labelRM.Text = "元宝：--";
            this.labelRM.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelVM
            // 
            this.labelVM.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelVM.Location = new System.Drawing.Point(3, 42);
            this.labelVM.Name = "labelVM";
            this.labelVM.Size = new System.Drawing.Size(74, 34);
            this.labelVM.TabIndex = 2;
            this.labelVM.Text = "银币：--";
            this.labelVM.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.BackColor = System.Drawing.Color.LightYellow;
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.Controls.Add(this.labelGrain, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.labelCard, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.labelLevel, 0, 3);
            this.tableLayoutPanel1.Controls.Add(this.labelaExp, 1, 3);
            this.tableLayoutPanel1.Controls.Add(this.labelStamima, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.labelEnergy, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.labelNickname, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.labelVM, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.labelRM, 1, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 5;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 23.32778F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 19.16805F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 19.16805F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 19.16805F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 19.16805F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(160, 182);
            this.tableLayoutPanel1.TabIndex = 1;
            // 
            // labelLevel
            // 
            this.labelLevel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelLevel.Location = new System.Drawing.Point(3, 110);
            this.labelLevel.Name = "labelLevel";
            this.labelLevel.Size = new System.Drawing.Size(74, 34);
            this.labelLevel.TabIndex = 9;
            this.labelLevel.Text = "等级：--";
            this.labelLevel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelaExp
            // 
            this.labelaExp.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelaExp.Location = new System.Drawing.Point(83, 110);
            this.labelaExp.Name = "labelaExp";
            this.labelaExp.Size = new System.Drawing.Size(74, 34);
            this.labelaExp.TabIndex = 8;
            this.labelaExp.Text = "经验：--/--";
            this.labelaExp.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelStamima
            // 
            this.labelStamima.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelStamima.Location = new System.Drawing.Point(83, 76);
            this.labelStamima.Name = "labelStamima";
            this.labelStamima.Size = new System.Drawing.Size(74, 34);
            this.labelStamima.TabIndex = 6;
            this.labelStamima.Text = "体力：--/--";
            this.labelStamima.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelEnergy
            // 
            this.labelEnergy.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelEnergy.Location = new System.Drawing.Point(3, 76);
            this.labelEnergy.Name = "labelEnergy";
            this.labelEnergy.Size = new System.Drawing.Size(74, 34);
            this.labelEnergy.TabIndex = 5;
            this.labelEnergy.Text = "精力：--/--";
            this.labelEnergy.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelCard
            // 
            this.labelCard.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelCard.Location = new System.Drawing.Point(83, 144);
            this.labelCard.Name = "labelCard";
            this.labelCard.Size = new System.Drawing.Size(74, 38);
            this.labelCard.TabIndex = 10;
            this.labelCard.Text = "卡片:--/--";
            this.labelCard.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelGrain
            // 
            this.labelGrain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelGrain.Location = new System.Drawing.Point(3, 144);
            this.labelGrain.Name = "labelGrain";
            this.labelGrain.Size = new System.Drawing.Size(74, 38);
            this.labelGrain.TabIndex = 11;
            this.labelGrain.Text = "粮食：--";
            this.labelGrain.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // PlayInfoLabel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "PlayInfoLabel";
            this.Size = new System.Drawing.Size(160, 182);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label labelNickname;
        private System.Windows.Forms.Label labelRM;
        private System.Windows.Forms.Label labelVM;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label labelStamima;
        private System.Windows.Forms.Label labelEnergy;
        private System.Windows.Forms.Label labelaExp;
        private System.Windows.Forms.Label labelLevel;
        private System.Windows.Forms.Label labelGrain;
        private System.Windows.Forms.Label labelCard;
    }
}
