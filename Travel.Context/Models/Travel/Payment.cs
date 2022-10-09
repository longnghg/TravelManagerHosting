using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Payment
    {
        public string IdPayment { get; set; }
        public string NamePayment { get; set; }
        public string Type { get; set; }
        public string TourBookingId { get; set; }
        public virtual Tourbooking Tourbooking { get; set; }
    }
}
