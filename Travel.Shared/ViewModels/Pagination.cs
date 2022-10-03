using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Pagination
    {
        private string pageNumber;
        private string pageSize;
        private int pageTotal;

        public string PageNumber { get => pageNumber; set => pageNumber = value; }
        public string PageSize { get => pageSize; set => pageSize = value; }
        public int PageTotal { get => pageTotal; set => pageTotal = value; }
    }
}
