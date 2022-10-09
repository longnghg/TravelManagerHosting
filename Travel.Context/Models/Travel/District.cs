using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class District
    {
        public Guid IdDistrict { get; set; }
        public string Name { get; set; }
        public Guid IdProvince { get; set; }
        public Province Province { get; set; }
        public ICollection<Ward> Ward { get; set; }

    }
}
