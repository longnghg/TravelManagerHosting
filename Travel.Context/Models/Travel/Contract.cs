using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Contract
    {
        private Guid id;
        private Guid idService;
        private string contractName;
        private string typeService;
        private Guid idFile;
        private long signDate;
        private long expDate;
        private long modifyDate;
        private long createDate;
        private string modifyBy;
        private string createBy;
        private int status;

        public Guid Id { get => id; set => id = value; }
        public Guid IdService { get => idService; set => idService = value; }
        public string ContractName { get => contractName; set => contractName = value; }
        public string TypeService { get => typeService; set => typeService = value; }
        public Guid IdFile { get => idFile; set => idFile = value; }
        public long SignDate { get => signDate; set => signDate = value; }
        public long ExpDate { get => expDate; set => expDate = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public string CreateBy { get => createBy; set => createBy = value; }
        public int Status { get => status; set => status = value; }
    }
}
