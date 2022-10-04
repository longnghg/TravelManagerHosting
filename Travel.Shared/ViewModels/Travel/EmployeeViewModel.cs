using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Travel.Shared.Ultilities.Enums;

namespace Travel.Shared.ViewModels.Travel
{
    public class EmployeeViewModel
    {
        private Guid id;
        private string name;
        private string email;
        private long birthday;
        private string image;
        private string phone;

        private TitleRole roleId;
        private string roleName;
        private string roleDescription;

        private int status;
        private long createDate;

        private string modifyBy;
        private long modifyDate;

        private bool isDelete;
        private bool isActive;



        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public long Birthday { get => birthday; set => birthday = value; }
        public string Image { get => image; set => image = value; }
        public string Phone { get => phone; set => phone = value; }
        public TitleRole RoleId { get => roleId; set => roleId = value; }
        public int Status { get => status; set => status = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
        public string RoleName { get => roleName; set => roleName = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public string RoleDescription { get => roleDescription; set => roleDescription = value; }
    }
}
