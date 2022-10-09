using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Tourbooking
    {
        public string IdTourbooking{get;set;}
        public string NameCustomer { get;set;}
        public string NameContact { get;set;}
        public string Phone{get;set;}
        public string BookingNo{get;set;}
        public string Pincode{get;set;}       
        public long   DateBooking{get;set;}
        public long   LastDate{get;set;}
        public double Vat{get;set;}
        public string Address{get;set;}
        public string Email{get;set;}
        public string VoucherCode{get;set;}
        public bool   IsCalled{get;set;}
        public float  Deposit{get;set;}
        public float  RemainPrice{get;set;}
        public float  TotalPrice{get;set;}
        public string ModifyBy{get;set;}
        public long   ModifyDate{get;set;}
        public ICollection<Payment> Payment { get; set; }
        public TourbookingDetails TourbookingDetails { get; set; }

    }
}
