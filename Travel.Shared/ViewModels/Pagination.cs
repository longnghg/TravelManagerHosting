using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Keywords
    {
        public string Keyword { get; set; }
        public string KwName { get; set; }
        public string KwId { get; set; }
        public string KwPhone { get; set; }
        public string KwEmail { get; set; }
        public List<int> KwRoleId { get; set; }
        public string KwRoleName { get; set; }
        public string KwStatus { get; set; }
        public bool KwIsActive { get; set; }
    }
}
