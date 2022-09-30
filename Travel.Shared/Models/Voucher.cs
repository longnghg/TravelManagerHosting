using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Voucher
    {
        private int id;
        private string code;
        private string description;
        private decimal discount;
        private long startDate;
        private long endDate;
        private long createDate;
        private long modifyDate;
        private string modifyBy;
        private string createBy;
        private double point;
        private int status;
        private bool isDelete;
        private bool isFree;

        public int Id { get => id; set => id = value; }
        public string Code { get => code; set => code = value; }
        public string Description { get => description; set => description = value; }
        public decimal Discount { get => discount; set => discount = value; }
        public long StartDate { get => startDate; set => startDate = value; }
        public long EndDate { get => endDate; set => endDate = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public string CreateBy { get => createBy; set => createBy = value; }
        public double Point { get => point; set => point = value; }
        public int Status { get => status; set => status = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
        public bool IsFree { get => isFree; set => isFree = value; }
    }
}
