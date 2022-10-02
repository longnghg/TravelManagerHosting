using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library
{
    public class Tourbooking
    {
        private string id;
        private string customerName;
        private string contactName;
        private string Phone;
        private string bookingNo;
        private string pincode;       
        private long dateBooking;
        private long lastDate;
        private double vat;
        private string address;
        private string email;
        private string voucherCode;
        private bool isCalled;
        private float deposit;
        private float remainPrice;
        private float totalPrice;
        private string modifyBy;
        private long modifyDate;

        public string Id { get => id; set => id = value; }
        public string CustomerName { get => customerName; set => customerName = value; }
        public string ContactName { get => contactName; set => contactName = value; }
        public string Phone1 { get => Phone; set => Phone = value; }
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
