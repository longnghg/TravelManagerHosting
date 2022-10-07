using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            employee.SetDataEmployee(frmData, ref message);
            res = employee.GetEmployees();
            return Ok(res);
        }

        [HttpGet]
        [Authorize]
        [Route("test")]
        public object Test()
        {
            res = employee.Test();
            return Ok(res);
        }
    }
}
