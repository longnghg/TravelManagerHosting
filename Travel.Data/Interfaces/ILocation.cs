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
        Response GetProvinces();
        Response GetDistrict(District district);
        Response GetWard(Ward ward);
        Response InsertProvince(Province province);
        Response InsertDistrict(District district);
        Response InsertWard(Ward ward);
        Response UpdateProvince(Province province);
        Response UpdateDistrict(District district);
        Response UpdateWard(Ward ward);
        Response DeleteProvince(Province province);
        Response DeleteDistrict(District district);
        Response DeleteWard(Ward ward);
    }
}
