﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Travel.Shared.Ultilities.Enums;

namespace Travel.Shared.ViewModels.Travel
{
    public class CreateEmployeeViewModel
    {
        private string name;
        private string email;
        private long birthday;
        private string image;
        private string phone;
        private TitleRole roleId;
        private int status; 


        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public long Birthday { get => birthday; set => birthday = value; }
        public string Image { get => image; set => image = value; }
        public string Phone { get => phone; set => phone = value; }
        public TitleRole RoleId { get => roleId; set => roleId = value; }
        public int Status { get => status; set => status = value; }      
    }
}
