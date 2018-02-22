using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace sgllapp.Data
{
    public partial class SgllContext
    {
        // see https://docs.microsoft.com/en-us/ef/core/modeling/relational/ for more about the entity mapping.
        public DbSet<Card> Cards { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Skill>()
                        .HasOne(p => p.Card)
                        .WithMany(b => b.Skills)
                        .HasForeignKey(p => p.CardId)
                        .HasConstraintName("fk_card_id");
        }
    }

    [Table("card")]
    public class Card
    {
        [Column("id")]
        [JsonProperty("id")]
        public string Id { get; set; }

        [MaxLength(40)]
        [Column("name")]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Column("rarity")]
        [Range(0, 5)]
        [JsonProperty("rarity")]
        public int Rarity { get; set; }

        [Column("country")]
        [JsonProperty("country")]
        public int Country { get; set; }

        [Column("image")]
        [JsonProperty("image")]
        public string ImageName { get; set; }

        [Column("attack_max")]
        [JsonProperty("attack_max")]
        public int? AttackMax { get; set; }

        [Column("attack_min")]
        [JsonProperty("attack_min")]
        public int? AttackMin { get; set; }

        [Column("defence_max")]
        [JsonProperty("defence_max")]
        public int? DefenceMax { get; set; }

        [Column("defence_min")]
        [JsonProperty("defence_min")]
        public int? DefenceMin { get; set; }

        [Column("createtime")]
        [JsonIgnore]
        public DateTime CreateTime { get; set; }

        [Column("updatetime")]
        [JsonIgnore]
        public DateTime? UpdateTime { get; set; }

        [Column("category")]
        [JsonProperty("category")]
        public int Category { get; set; }

        public List<Skill> Skills { get; set; }
    }

    [Table("skill")]
    public class Skill
    {
        public int Id { get; set; }

        [Column("card_id")]
        public string CardId { get; set; }

        public Card Card { get; set; }

        [Column("require_entity_id")]
        [JsonProperty("require_entity_id")]
        public string RequiredEntityIds { get; set; }

        [Column("skill_name")]
        [JsonProperty("skill_name")]
        public string SkillName { get; set; }

        [Column("skill_type")]
        [JsonProperty("skill_type")]
        public string SkillType { get; set; }

        [Column("skill_value")]
        [JsonProperty("skill_value")]
        public int? SkillValue { get; set; }

        [Column("createtime")]
        public DateTime CreateTime { get; set; }

        [Column("updatetime")]
        public DateTime? UpdateTime { get; set; }
    }
}
