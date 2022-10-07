using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Pagination
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Keyword { get; set; }
        public string KwName { get; set; }
        public string KwId { get; set; }
        public string KwPhone { get; set; }
        public string KwEmail { get; set; }
        public string KwRoleId { get; set; }
        public string KwRoleName { get; set; }
        public string KwStatus { get; set; }
        public string KwIsActive { get; set; }
    }
}
