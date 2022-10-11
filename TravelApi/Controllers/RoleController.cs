using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data.Interfaces;
using Travel.Shared.ViewModels;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private IRole role;
        private Notification message;
        private Response res;
        public RoleController(IRole _role)
        {
            role = _role;
            res = new Response();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get-role")]
        public object GetRole()
        {
            res = role.ViewAll();
            return Ok(res);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get-roledelete")]
        public object GetRoleDelete()
        {
            res = role.ViewDelete();
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("create-role")]
        public object Create([FromBody] JObject frmData)
        {

            var result = role.CheckBeforSave(frmData, ref message);
            if (message == null)
            {
              res = role.Create(result);
            }
            
            return Ok(res);
        }

        [HttpPost]
        [Authorize]
        [Route("update-role")]
        public object Update([FromBody] JObject frmData)
        {

            var result = role.CheckBeforSave(frmData, ref message);
            if (message == null)
            {
                res = role.Update(result);
            }

            return Ok(res);
        }

        [HttpPost]
        [Authorize]
        [Route("restore-role")]
        public object Restore([FromBody] JObject frmData)
        {

            var result = role.CheckBeforSave(frmData, ref message);
            if (message == null)
            {
                res = role.Restore(result);
            }

            return Ok(res);
        }
    }
}
