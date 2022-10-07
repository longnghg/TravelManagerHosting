using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;

namespace Travel.Shared.ViewModels.Travel
{
    public class TourBookingViewModel
    {
        private string id;
        private string customerName; 
        private string address;
        private string email;
        private string phone;
        private string contactName;

        private long dateBooking;
        private long lastDate;
        private double vat;

        private string pincode;
        private string voucherCode;
        private string bookingNo;

        private bool isCalled;
        private float deposit;

        private float remainPrice;
        private float totalPrice;

        private string modifyBy;
        private long modifyDate;

        public ICollection<Payment> Payment { get; set; }
        public TourbookingDetails TourbookingDetails { get; set; }

        public string Id { get => id; set => id = value; }
        public string CustomerName { get => customerName; set => customerName = value; }
        public string ContactName { get => contactName; set => contactName = value; }
        public string Phone { get => phone; set => phone = value; }
        public string BookingNo { get => bookingNo; set => bookingNo = value; }
        public string Pincode { get => pincode; set => pincode = value; }
        public long DateBooking { get => dateBooking; set => dateBooking = value; }
        public long LastDate { get => lastDate; set => lastDate = value; }
        public double Vat { get => vat; set => vat = value; }
        public string Address { get => address; set => address = value; }
        public string Email { get => email; set => email = value; }
        public string VoucherCode { get => voucherCode; set => voucherCode = value; }
        public bool IsCalled { get => isCalled; set => isCalled = value; }
        public float Deposit { get => deposit; set => deposit = value; }
        public float RemainPrice { get => remainPrice; set => remainPrice = value; }
        public float TotalPrice { get => totalPrice; set => totalPrice = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
    }
}
