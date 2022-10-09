using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models.Travel
{
    public class CreateUpdateTimelineViewModel
    {
        private string id;
        private string description;
        private long fromTime;
        private long toTime;
        private string idSchedule;

      
        public string Id { get => id; set => id = value; }
        public string Description { get => description; set => description = value; }
        public long FromTime { get => fromTime; set => fromTime = value; }
        public long ToTime { get => toTime; set => toTime = value; }
        public string IdSchedule { get => idSchedule; set => idSchedule = value; }
    
    }
}
