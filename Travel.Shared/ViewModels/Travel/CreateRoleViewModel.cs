using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels.Travel
{
    public class CreateRoleViewModel
    {
        private string roleName;
        private string description;

        public string RoleName { get => roleName; set => roleName = value; }
        public string Description { get => description; set => description = value; }
    }
}
