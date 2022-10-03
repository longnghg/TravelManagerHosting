using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class District
    {
        private Guid id;
        private string name;
        private Guid idProvice;

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public Guid IdProvice { get => idProvice; set => idProvice = value; }
    }
}
