using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Shared.ViewModels;

namespace Travel.Data.Interfaces
{
    public interface IEmployee
    {
        Employee SetDataEmployee(JObject frmData, ref Notification _message);
        Response GetEmployees();
        Response Test();
    }
}
