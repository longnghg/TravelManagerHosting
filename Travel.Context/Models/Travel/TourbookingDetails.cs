using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class TourbookingDetails
    {
        public string IdTourbookingDetails{get;set;}
        public int    Baby{get;set;}
        public int    Child{get;set;}
        public int    adult{get;set;}
        public string Pincode{get;set;}
        public int    Status{get;set;}
        public bool   IsCalled{get;set;}
        public long   CallDate{get;set;}
        public string IdTourBooking{get;set;}
        public Tourbooking Tourbooking { get; set; }

    }
}
