using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models.Travel
{
    public class CreateTimelineViewModel
    {
        private string id;
        private string description;
        private long fromTime;
        private long toTime;
        private string idSchedule;

        private long beginDate;
        private long endDate;

        private string idTour;
        private string nameTour;
        public string Id { get => id; set => id = value; }
        public string Description { get => description; set => description = value; }
        public long FromTime { get => fromTime; set => fromTime = value; }
        public long ToTime { get => toTime; set => toTime = value; }
        public string IdSchedule { get => idSchedule; set => idSchedule = value; }
        public long BeginDate { get => beginDate; set => beginDate = value; }
        public long EndDate { get => endDate; set => endDate = value; }
        public string IdTour { get => idTour; set => idTour = value; }
        public string NameTour { get => nameTour; set => nameTour = value; }
    }
}
