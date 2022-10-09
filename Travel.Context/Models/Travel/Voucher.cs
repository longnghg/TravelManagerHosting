using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Voucher
    {
        public Guid IdVoucher { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public long StartDate { get; set; }
        public long EndDate { get; set; }
        public long CreateDate { get; set; }
        public long ModifyDate { get; set; }
        public string ModifyBy { get; set; }
        public string CreateBy { get; set; }
        public int Point { get; set; }
        public bool IsDelete { get; set; }
        public Guid CustomerId { get; set; }
    }
}
