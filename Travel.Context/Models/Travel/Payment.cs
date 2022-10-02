using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class Payment
    {
        private Guid id;
        private string name;
        private string type;

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Type { get => type; set => type = value; }
    }
}
