using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
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

        [HttpGet]
        [Authorize]
        [Route("gets-employee")]
        public object GetsEmployee()
        {
            res =  employee.Gets();
            return Ok(res);
        }

        [HttpPost]
        [Authorize]
        [Route("search-employee")]
        public object SearchEmployee([FromBody] JObject frmData)
        {
            res = employee.Search(frmData);
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
        //[HttpGet]
        //[Authorize]
        //[Route("create-data")]
        //public object Create()
        //{
        //    for (int i = 0; i <= 500; i++)
        //    {
        //        Employee newobj = new Employee();
        //        newobj.IdEmployee = Guid.NewGuid();
        //        newobj.NameEmployee = "Anh" + i.ToString();
        //        newobj.Email = "Teoteo@gmail.com";
        //        newobj.Password = "123";
        //        newobj.Birthday = 123;
        //        newobj.Image = "123";
        //        newobj.Phone = "123123123";
        //        newobj.RoleId = 2;
        //        newobj.CreateDate = 123;
        //        newobj.AccessToken = "123";
        //        newobj.ModifyBy = "123";
        //        newobj.ModifyDate = 123123;
        //        newobj.IsDelete = false;
        //        newobj.IsActive = false;
        //        _db.Employees.Add(newobj);
        //    }
        //    _db.SaveChanges();
        //    return Ok("succcccc");
        //}

        [HttpPost]
        [Authorize]
        [Route("create-employee")]
        public object Create([FromBody] JObject frmData)
        {
            var result = employee.CheckBeforeSave(frmData, ref message);
            if(message == null)
            {
                res = employee.Create(result);
            }
            return Ok(res);
        }

        [HttpPost]
        [Authorize]
        [Route("update-employee")]
        public object Update([FromBody] JObject frmData)
        {

            var result = employee.CheckBeforeSave(frmData, ref message);
            if (message == null)
            {
                res = employee.Update(result);
            }
            return Ok(res);
        }
    }
}
