using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private Responsive res;
        public EmployeeController(IEmployee _employee)
        {
            employee = _employee;
            res = new Responsive();
        }

        [HttpGet]
        [Authorize]
        [Route("GetEmployees")]
        public object GetEmployees()
        {
            res = employee.GetEmployees();
            return Ok(res);
        }
    }
}
