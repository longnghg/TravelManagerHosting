using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Tour
    {
        private string id;
        private string tourName;
        private double rating;
        private string thumbsnail;
        private string fromPlace;
        private string toPlace;

        private string approveStatus;   
        private int status;

        private long createDate;

        private string modifyBy;
        private long modifyDate;

        private bool isDelete;
        private bool isActive;
        public ICollection<Schedule> schedules { get; set; }

        public string Id { get => id; set => id = value; }
        public string TourName { get => tourName; set => tourName = value; }
        public double Rating { get => rating; set => rating = value; }
        public string FromPlace { get => fromPlace; set => fromPlace = value; }
        public string ToPlace { get => toPlace; set => toPlace = value; }
        public string ApproveStatus { get => approveStatus; set => approveStatus = value; }
        public int Status { get => status; set => status = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public string Thumbsnail { get => thumbsnail; set => thumbsnail = value; }
    }
}
