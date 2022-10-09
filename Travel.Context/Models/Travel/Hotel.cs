using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Hotel
    {

        public Guid IdHotel  { get; set; }
        public Guid ContractId { get; set; }
        public string NameHotel { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Star { get; set; }
        public float SingleRoomPrice { get; set; }
        public float DoubleRoomPrice { get; set; }
        public int QuantityDBR { get; set; }
        public int QuantitySR { get; set; }
        public string ModifyBy { get; set; }
        public long ModifyDate { get; set; }
        public ICollection<CostTour> CostTours { get; set; }
    }
}
