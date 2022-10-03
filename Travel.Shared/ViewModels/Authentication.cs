using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.ViewModels
{
    public class Authentication
    {
        private string token;
        private string roleId;
        private string employeeId;
        private string employeeName;
        private string employeeImg;

        public string Token { get => token; set => token = value; }
        public string RoleId { get => roleId; set => roleId = value; }
        public string EmployeeId { get => employeeId; set => employeeId = value; }
        public string EmployeeName { get => employeeName; set => employeeName = value; }
        public string EmployeeImg { get => employeeImg; set => employeeImg = value; }
    }
}
