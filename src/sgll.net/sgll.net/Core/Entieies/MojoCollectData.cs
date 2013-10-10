using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoCollectData : AbstractMojoColdDown
    {
        public List<MojoCollectItem> Items { get; set; }
    }

    public class MojoCollectItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int AwayTime { get; set; }
        public DateTime LastSyncTime { get; set; }
        public List<MojoCollectFragment> Fragments { get; set; }
        public int Count { get; set; }

        public bool IsCollecting
        {
            get
            {
                return AwayTime > 0;
            }
        }

        public bool CanStartCollect
        {
            get
            {
                return Fragments != null && Fragments.All(p => p.Count > 0);
            }
        }
    }

    public class MojoCollectFragment
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
