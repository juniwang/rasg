using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core.Entieies
{
    public class MojoForceInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string Announcement { get; set; }
        public int Grain { get; set; }
        public int GrainProtected { get; set; }
        public int Challenge { get; set; }
        public int ChallengeLimit { get; set; }
        public int MemberNum { get; set; }
        public int MemberNumLimit { get; set; }
        public int first_class_officer_num { get; set; }
        public int first_class_officer_num_limit { get; set; }
        public int second_class_officer_num { get; set; }
        public int second_class_officer_num_limit { get; set; }
        public int third_class_officer_num { get; set; }
        public int third_class_officer_num_limit { get; set; }
        public string OwnerName { get; set; }
        public string ViceOwnerName { get; set; }
    }
}
