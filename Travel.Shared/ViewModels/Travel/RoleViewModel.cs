using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels.Travel
{
    public class RoleViewModel
    {
        private int id;
        private string name;
        private string description;
        private bool isDelete;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
    }
}
