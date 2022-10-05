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
    public interface ILocation
    {
        Province SetDataProvince(JObject frmData, ref Notification _message);
        District SetDataDistrict(JObject frmData, ref Notification _message);
        Ward SetDataWard(JObject frmData, ref Notification _message);
        Responsive GetProvinces();
        Responsive GetDistrict(District district);
        Responsive GetWard(Ward ward);
        Responsive InsertProvince(Province province);
        Responsive InsertDistrict(District district);
        Responsive InsertWard(Ward ward);
        Responsive UpdateProvince(Province province);
        Responsive UpdateDistrict(District district);
        Responsive UpdateWard(Ward ward);
        Responsive DeleteProvince(Province province);
        Responsive DeleteDistrict(District district);
        Responsive DeleteWard(Ward ward);
    }
}
