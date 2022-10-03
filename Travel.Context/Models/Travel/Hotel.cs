using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Hotel
    {
        private Guid id;
        private Guid idContract;
        private string name;
        private string phone;
        private string address;
        private int star;
        private float singleRoomPrice;
        private float doubleRoomPrice;
        private int quantityDBR;
        private int quantitySR;
        private string modifyBy;
        private long modifyDate;

        public Guid Id { get => id; set => id = value; }
        public Guid IdContract { get => idContract; set => idContract = value; }
        public string Name { get => name; set => name = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Address { get => address; set => address = value; }
        public int Star { get => star; set => star = value; }
        public float SingleRoomPrice { get => singleRoomPrice; set => singleRoomPrice = value; }
        public float DoubleRoomPrice { get => doubleRoomPrice; set => doubleRoomPrice = value; }
        public int QuantityDBR { get => quantityDBR; set => quantityDBR = value; }
        public int QuantitySR { get => quantitySR; set => quantitySR = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
    }
}
