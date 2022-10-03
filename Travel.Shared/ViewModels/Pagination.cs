using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Pagination
    {
        public string PageNumber { get; set; }
        public string PageSize { get; set; }
        public int PageTotal { get; set; }
    }
}
