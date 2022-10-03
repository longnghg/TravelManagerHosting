using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Voucher
    {
        private Guid id;
        private string code;
        private string description;
        private int value;
        private long startDate;
        private long endDate;
        private long createDate;
        private long modifyDate;
        private string modifyBy;
        private string createBy;
        private int point;
        private bool isDelete;
        private Guid idCustomer;
        public Guid Id { get => id; set => id = value; }
        public string Code { get => code; set => code = value; }
        public string Description { get => description; set => description = value; }
        public int Value { get => value; set => this.value = value; }
        public long StartDate { get => startDate; set => startDate = value; }
        public long EndDate { get => endDate; set => endDate = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public string CreateBy { get => createBy; set => createBy = value; }
        public int Point { get => point; set => point = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
        public Guid IdCustomer { get => idCustomer; set => idCustomer = value; }
    }
}
