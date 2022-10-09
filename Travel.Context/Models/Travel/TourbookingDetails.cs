using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class TourbookingDetails
    {
        public string idTourbookingDetails{get;set;}
        public int baby{get;set;}
        public int child{get;set;}
        public int adult{get;set;}
        public string pincode{get;set;}
        public int status{get;set;}
        public bool isCalled{get;set;}
        public long callDate{get;set;}
        public string idTourBooking{get;set;}
        public Tourbooking Tourbooking { get; set; }

    }
}
