using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Shared.ViewModels;
using Travel.Shared.ViewModels.Travel;

namespace Travel.Data.Interfaces
{
    public interface IEmployee
    {
        CreateUpdateEmployeeViewModel CheckBeforeSave(JObject frmData, ref Notification _message);
        Response GetEmployees();
        Response Update(CreateUpdateEmployeeViewModel input);
    }
}
