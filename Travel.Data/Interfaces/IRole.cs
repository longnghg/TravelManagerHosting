using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Shared.ViewModels;
using Travel.Shared.ViewModels.Travel;

namespace Travel.Data.Interfaces
{
    public interface IRole
    {
        CreateUpdateRoleViewModel CheckBeforSave(JObject frmData, ref Notification _message);
        Response ViewAll();
        Response Create(CreateUpdateRoleViewModel input);
        Response Update(CreateUpdateRoleViewModel input);

        Response Restore(CreateUpdateRoleViewModel input);
    }
}
