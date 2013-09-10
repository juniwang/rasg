using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoPlayer
    {
        public string Name { get; set; }
        public string NickName { get; set; }
        public int Level { get; set; }
        public int Exp { get; set; }
        public int LevelExp { get; set; }
        /// <summary>
        /// 银币
        /// </summary>
        public int VM { get; set; }
        /// <summary>
        /// 元宝
        /// </summary>
        public int RM { get; set; }
        /// <summary>
        /// current energy
        /// </summary>
        public int EP { get; set; }
        public int Energy { get; set; }

        /// <summary>
        /// current stamima
        /// </summary>
        public int SP { get; set; }
        public int Stamima { get; set; }

        public int Grain { get; set; }
    }
}
