using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Payment
    {
        private string id;
        private string name;
        private string type;
        private string idTourBooking;
        public Tourbooking Tourbooking { get; set; }
        public string Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Type { get => type; set => type = value; }
        public string IdTourBooking { get => idTourBooking; set => idTourBooking = value; }
    }
}
