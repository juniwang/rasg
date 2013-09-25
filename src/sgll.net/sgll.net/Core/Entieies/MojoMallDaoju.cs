using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoMallDaoju : AbstractMojoEntity
    {
        public List<MojoMallDaojuItem> Items { get; set; }

        public MojoMallDaojuItem Get(string name)
        {
            if (Items != null)
                return Items.FirstOrDefault(p => p.Name == name);
            return null;
        }
    }

    public class MojoMallDaojuItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string PlayerEntityId { get; set; }
        public string GoodsId { get; set; }
    }
}
