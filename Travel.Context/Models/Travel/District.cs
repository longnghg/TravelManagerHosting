using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class District
    {
        private Guid id;
        private string name;
        private Guid idProvince;
        public Province Province { get; set; }
        public ICollection<Ward> Ward { get; set; }
        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public Guid IdProvince { get => idProvince; set => idProvince = value; }

    }
}
