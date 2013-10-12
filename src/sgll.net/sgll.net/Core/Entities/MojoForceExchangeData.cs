using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entities
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
        public bool Locked { get; set; }
    }

    public static class ForceExchangeEx
    {
        public static string GetKey(this MojoForceExchangeItem item)
        {
            return "force_exchange_" + item.Id;
        }

        public static bool IsChecked(this MojoForceExchangeItem item, LoginUser user)
        {
            return IsChecked(item, user, false);
        }

        public static bool IsChecked(this MojoForceExchangeItem item, LoginUser user, bool def)
        {
            var feature = user.GetFeature(SGLLController.QueueGUID.ForceExchangeQueue);
            if (feature != null && feature.Parameters != null && feature.Parameters.ContainsKey(item.GetKey()))
            {
                return bool.Parse(feature.Parameters[item.GetKey()]);
            }

            return def;
        }
    }
}
