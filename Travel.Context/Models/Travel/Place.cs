using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Place
    {
        private Guid id;
        private Guid idContract;
        private string name;
        private string address;
        private string phone;
        private float priceTicket;
        private string modifyBy;
        private long modifyDate;

        public Guid Id { get => id; set => id = value; }
        public Guid IdContract { get => idContract; set => idContract = value; }
        public string Name { get => name; set => name = value; }
        public string Address { get => address; set => address = value; }
        public string Phone { get => phone; set => phone = value; }
        public float PriceTicket { get => priceTicket; set => priceTicket = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
    }
}
