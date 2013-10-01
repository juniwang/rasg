using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoForceExchangeData : AbstractMojoColdDown
    {
        public List<MojoForceExchangeItem> Items { get; set; }
    }

    public class MojoForceExchangeItem : AbstractMojoColdDown
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Grain { get; set; }
        public string Award { get; set; }
    }
}
