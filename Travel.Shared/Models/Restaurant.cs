using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Restaurant
    {
        private int id;
        private int idContract;
        private string name;
        private string address;
        private string phone;
        private string modifyBy;
        private long modifyDate;

        public int Id { get => id; set => id = value; }
        public int IdContract { get => idContract; set => idContract = value; }
        public string Name { get => name; set => name = value; }
        public string Address { get => address; set => address = value; }
        public string Phone { get => phone; set => phone = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
    }
}
