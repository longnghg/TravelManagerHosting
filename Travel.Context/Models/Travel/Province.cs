using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Province
    {
        private Guid id;
        private string name;

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public ICollection<District> Districts { get; set; }
    }
}
