using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels.Travel
{
    public class CreateUpdateRoleViewModel
    {
        private int idRole;
        private string roleName;
        private string description;

        public string RoleName { get => roleName; set => roleName = value; }
        public string Description { get => description; set => description = value; }
        public int IdRole { get => idRole; set => idRole = value; }
    }
}
