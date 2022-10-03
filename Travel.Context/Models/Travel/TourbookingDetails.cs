using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library
{
    public class TourbookingDetails
    {
        private string id;
        private int baby;
        private int child;
        private int adult;
        private string pincode;
        private int status;
        private bool isCalled;
        private long callDate;

        public string Id { get => id; set => id = value; }
        public int Baby { get => baby; set => baby = value; }
        public int Child { get => child; set => child = value; }
        public int Adult { get => adult; set => adult = value; }
        public string Pincode { get => pincode; set => pincode = value; }
        public int Status { get => status; set => status = value; }
        public bool IsCalled { get => isCalled; set => isCalled = value; }
        public long CallDate { get => callDate; set => callDate = value; }
    }
}
