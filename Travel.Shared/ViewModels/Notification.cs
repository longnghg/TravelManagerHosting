using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Notification
    {
        private string messenge;
        private string type;
        private string description;
        private DateTime dateTime;

        public string Messenge { get => messenge; set => messenge = value; }

        public string Type { get => type; set => type = value; }

        public DateTime DateTime { get => dateTime; set => dateTime = value; }

        public string Description { get => description; set => description = value; }
        
    }
}
