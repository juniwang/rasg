using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entities
{
    public class MojoCardSale : AbstractMojoColdDown
    {
        public List<MojoCardEntity> CardsToSell { get; set; }
    }

    public class MojoCardEntity
    {
        /*{"id":"j2307","name":"于禁","player_entity_id":"826973779","status":"0","rarity_id":"3","level":"1\/30","small_image":"\/mojo\/resources\/classic\/mobile\/image\/entity\/1\/small\/j2307.png","type_id":"1","islock":"0","rebirth_sum":0}*/

        public string Id { get; set; }
        public string Name { get; set; }
        public string PlayerEntityId { get; set; }
        /// <summary>
        /// 1=5星卡  5=1星卡
        /// </summary>
        public string RarityId { get; set; }
        /// <summary>
        /// e.g:1/30
        /// </summary>
        public string Level { get; set; }
    }
}
