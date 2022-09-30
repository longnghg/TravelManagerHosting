using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Hotel
    {
        private int id;
        private int idContract;
        private string name;
        private string phone;
        private string address;
        private double star;
        private decimal singleRoomPrice;
        private decimal doubleRoomPrice;
        private int quantityDBR;
        private int quantitySR;
        private string modifyBy;
        private long modifyDate;

        public int Id { get => id; set => id = value; }
        public int IdContract { get => idContract; set => idContract = value; }
        public string Name { get => name; set => name = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Address { get => address; set => address = value; }
        public double Star { get => star; set => star = value; }
        public decimal SingleRoomPrice { get => singleRoomPrice; set => singleRoomPrice = value; }
        public decimal DoubleRoomPrice { get => doubleRoomPrice; set => doubleRoomPrice = value; }
        public int QuantityDBR { get => quantityDBR; set => quantityDBR = value; }
        public int QuantitySR { get => quantitySR; set => quantitySR = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
    }
}
