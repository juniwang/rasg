namespace sgll.net
{
    partial class ForceProfileLabel
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
            this.labelName = new System.Windows.Forms.Label();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.labelaChallange = new System.Windows.Forms.Label();
            this.labelGrainProtected = new System.Windows.Forms.Label();
            this.labelGrain = new System.Windows.Forms.Label();
            this.labelLevel = new System.Windows.Forms.Label();
            this.labelMember = new System.Windows.Forms.Label();
            this.labelOwner = new System.Windows.Forms.Label();
            this.labelViceOwner = new System.Windows.Forms.Label();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // labelName
            // 
            this.labelName.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelName.Font = new System.Drawing.Font("Tahoma", 10F, System.Drawing.FontStyle.Bold);
            this.labelName.Location = new System.Drawing.Point(3, 0);
            this.labelName.Name = "labelName";
            this.labelName.Size = new System.Drawing.Size(169, 50);
            this.labelName.TabIndex = 0;
            this.labelName.Text = "--";
            this.labelName.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.BackColor = System.Drawing.Color.LightYellow;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.labelViceOwner, 0, 6);
            this.tableLayoutPanel1.Controls.Add(this.labelOwner, 0, 5);
            this.tableLayoutPanel1.Controls.Add(this.labelMember, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.labelaChallange, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.labelGrainProtected, 0, 3);
            this.tableLayoutPanel1.Controls.Add(this.labelGrain, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.labelLevel, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.labelName, 0, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 7;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 23.00035F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 11.00017F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 11.00017F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 11.00017F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 11.00017F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 10.99966F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 10.99966F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 10.99966F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(175, 221);
            this.tableLayoutPanel1.TabIndex = 1;
            // 
            // labelaChallange
            // 
            this.labelaChallange.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelaChallange.Location = new System.Drawing.Point(3, 146);
            this.labelaChallange.Name = "labelaChallange";
            this.labelaChallange.Size = new System.Drawing.Size(169, 24);
            this.labelaChallange.TabIndex = 8;
            this.labelaChallange.Text = "挑战书：--/--";
            this.labelaChallange.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelGrainProtected
            // 
            this.labelGrainProtected.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelGrainProtected.Location = new System.Drawing.Point(3, 98);
            this.labelGrainProtected.Name = "labelGrainProtected";
            this.labelGrainProtected.Size = new System.Drawing.Size(169, 24);
            this.labelGrainProtected.TabIndex = 7;
            this.labelGrainProtected.Text = "保护粮食：--";
            this.labelGrainProtected.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelGrain
            // 
            this.labelGrain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelGrain.Location = new System.Drawing.Point(3, 74);
            this.labelGrain.Name = "labelGrain";
            this.labelGrain.Size = new System.Drawing.Size(169, 24);
            this.labelGrain.TabIndex = 6;
            this.labelGrain.Text = "粮食：--";
            this.labelGrain.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelLevel
            // 
            this.labelLevel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelLevel.Location = new System.Drawing.Point(3, 50);
            this.labelLevel.Name = "labelLevel";
            this.labelLevel.Size = new System.Drawing.Size(169, 24);
            this.labelLevel.TabIndex = 5;
            this.labelLevel.Text = "等级：--";
            this.labelLevel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelMember
            // 
            this.labelMember.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelMember.Location = new System.Drawing.Point(3, 122);
            this.labelMember.Name = "labelMember";
            this.labelMember.Size = new System.Drawing.Size(169, 24);
            this.labelMember.TabIndex = 9;
            this.labelMember.Text = "会员：--/--";
            this.labelMember.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelOwner
            // 
            this.labelOwner.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelOwner.Location = new System.Drawing.Point(3, 170);
            this.labelOwner.Name = "labelOwner";
            this.labelOwner.Size = new System.Drawing.Size(169, 24);
            this.labelOwner.TabIndex = 10;
            this.labelOwner.Text = "势力主：--";
            this.labelOwner.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelViceOwner
            // 
            this.labelViceOwner.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelViceOwner.Location = new System.Drawing.Point(3, 194);
            this.labelViceOwner.Name = "labelViceOwner";
            this.labelViceOwner.Size = new System.Drawing.Size(169, 27);
            this.labelViceOwner.TabIndex = 11;
            this.labelViceOwner.Text = "副势力主：--";
            this.labelViceOwner.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // ForceProfileLabel
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "ForceProfileLabel";
            this.Size = new System.Drawing.Size(175, 221);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label labelName;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label labelGrain;
        private System.Windows.Forms.Label labelLevel;
        private System.Windows.Forms.Label labelGrainProtected;
        private System.Windows.Forms.Label labelaChallange;
        private System.Windows.Forms.Label labelViceOwner;
        private System.Windows.Forms.Label labelOwner;
        private System.Windows.Forms.Label labelMember;
    }
}
