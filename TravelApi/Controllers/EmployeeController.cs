using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Data.Interfaces;
using Travel.Shared.Ultilities;
using Travel.Shared.ViewModels;
using Travel.Shared.ViewModels.Travel;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployee employee;
        private Notification message;
        private Response res;
        public EmployeeController(IEmployee _employee)
        {
            employee = _employee;
            res = new Response();
        }

        [HttpPost]
        [Authorize]
        [Route("get-employees")]
        public object GetEmployees([FromBody] JObject frmData)
        {
            employee.CheckBeforeSave(frmData, ref message);
            res = employee.GetEmployees();
            return Ok(res);
        }
        //[HttpPost]
        //[Authorize]
        //[Route("create-employees")]
        //public object Create([FromBody] JObject frmData)
        //{

        //   var result = employee.CheckBeforeSave(frmData, ref message);
        //    if (message != null)
        //    {
        //        res = employee.GetEmployees();
        //    }
        //    return Ok(res);
        //}

        [HttpPost]
        [Authorize]
        [Route("create-employees")]
        public object Create([FromBody] JObject frmData)
        {
            var result = employee.CheckBeforeSave(frmData, ref message);
            if(message == null)
            {
                res = employee.Create(result);
            }
            return Ok(res);
        }
    }
}
