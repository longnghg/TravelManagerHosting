using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Responsive : Pagination
    {
        private int status;
        private string content;
        private Notification notification;

        public int Status { get => status; set => status = value; }
        public string Content { get => content; set => content = value; }
        public Notification Notification { get => notification; set => notification = value; }
    }
}
