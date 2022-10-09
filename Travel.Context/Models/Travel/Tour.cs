using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Tour
    {     
        public string IdTour { get; set; }
        public string NameTour { get; set; }
        public double Rating { get; set; }
        public string FromPlace { get; set; }
        public string ToPlace { get; set; }
        public string ApproveStatus { get; set; }
        public int Status { get; set; }
        public long CreateDate { get; set; }
        public string ModifyBy { get; set; }
        public long ModifyDate { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
        public string Thumbsnail { get; set; }
        public ICollection<Schedule> Schedules { get; set; }

    }
}
