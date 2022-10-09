using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Employee
    {
        public Guid IdEmployee { get; set; }
        public string Name       { get; set; }
        public string Email     { get; set; }
        public string Password   { get; set; }
        public long Birthday     { get; set; }
        public string Image      { get; set; }
        public string Phone      { get; set; }
        public int RoleId        { get; set; }
        public long CreateDate   { get; set; }
        public string AccessToken{ get; set; }
        public string ModifyBy   { get; set; }
        public long ModifyDate   { get; set; }
        public bool IsDelete     { get; set; }
        public bool IsActive     { get; set; }
        public Role Role         { get; set; }
        

        public  Role role { get; set; }
        public ICollection<Schedule> Schedules { get; set; }

    }

}
