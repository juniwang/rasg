using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace sgll.net.Core.Entities
{
    public class MojoActivityData : AbstractMojoColdDown
    {
        public List<MojoActivityItem> Activities { get; set; }
    }

    public class MojoActivityItem : AbstractMojoColdDown
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsRepeat { get; set; }
        public int NeedPlayerLevel { get; set; }
        public int Probability { get; set; }
        public List<MojoActivityItemCondition> Conditions { get; set; }
        /// <summary>
        /// 已兑换(可重复的活动表示已至少兑换一次)
        /// </summary>
        public bool HasDo { get; set; }
        /// <summary>
        /// 已结束
        /// </summary>
        public bool HasInvalid { get; set; }
        /// <summary>
        /// 未开始
        /// </summary>
        public bool NotStart { get; set; }
        /// <summary>
        /// 可兑换。本程序需考虑下列特殊情况：
        /// 1.蒋干/蒙古马不足时该值为false，但可程序自动购买所以这种情况应该是true(可兑换)。
        /// 2.活动碎片互相转换，该值为true。但这种情况不应该自动兑换
        /// 3.可重复的活动，该值也是true，但还应该检测冷却时间
        /// </summary>
        public bool CouldDo { get; set; }
        public string AwardName { get; set; }
        public string AwardId { get; set; }
        public string AwardGot { get; set; }

        public string CDDisplay
        {
            get
            {
                return IsRepeat ? ColdDownDisplay : SR.Display.ColdDownDisable;
            }
        }

        public string StatusDisplay
        {
            get
            {
                if (NotStart) return "未开始";
                if (HasInvalid) return "已结束";
                if (CouldDo)
                {
                    if (IsRepeat && ColdDown > 0) return "冷却中";
                    return "未兑换";
                }
                if (HasDo) return "已兑换";
                return "条件不足";
            }
        }

        public Color BackColor
        {
            get
            {
                if (NotStart) return Color.LightGray;
                if (HasInvalid) return Color.LightGray;
                if (CouldDo)
                {
                    return Color.White;
                }
                if (HasDo) return Color.LightGreen;
                return Color.Orange;
            }
        }
    }

    public class MojoActivityItemCondition
    {
        public string Id { get; set; }
        public string EntityId { get; set; }
        public string EntityName { get; set; }
        public string EntityLevel { get; set; }
        public int EntityCount { get; set; }
        public int PlayerEntityCount { get; set; }
        public bool IsEnough { get; set; }
        public bool NeedChoose { get; set; }
    }
}
