using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Customer
    {
        public Guid IdCustomer { get; set; }
        public string NameCustomer { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public long Birthday { get; set; }
        public long CreateDate { get; set; }
        public string AccessToken { get; set; }
        public int Point { get; set; }
        public string FbToken { get; set; }
        public string GoogleToken { get; set; }
    }
}
