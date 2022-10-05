using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using PrUtility;
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
    public class LocationController : ControllerBase
    {
        private ILocation location;
        private Notification message;
        private Responsive res;
        public LocationController(ILocation _location)
        {
            location = _location;
            res = new Responsive();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetProvince")]
        public object GetProvince()
        {
            res = location.GetProvinces();
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("GetDistrict")]
        public object GetDistrict([FromBody] JObject frmData)
        {
            var district = location.SetDataDistrict(frmData, ref message);
            if (message == null)
            {
                res = location.GetDistrict(district);
            }
            else
            {
                res.Notification = message;
            }
            
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("GetWard")]
        public object GetWard([FromBody] JObject frmData)
        {
            var ward = location.SetDataWard(frmData, ref message);
            if (message == null)
            {
                res = location.GetWard(ward);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("InsertProvince")]
        public object InsertProvince([FromBody] JObject frmData)
        {
            var province = location.SetDataProvince(frmData, ref message);
            if (message == null)
            {
                res = location.InsertProvince(province);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("InsertDistrict")]
        public object InsertDistrict([FromBody] JObject frmData)
        {
            var district = location.SetDataDistrict(frmData, ref message);
            if (message == null)
            {
                res = location.InsertDistrict(district);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("InsertWard")]
        public object InsertWard([FromBody] JObject frmData)
        {
            var ward = location.SetDataWard(frmData, ref message);
            if (message == null)
            {
                res = location.InsertWard(ward);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UpdateProvince")]
        public object UpdateProvince([FromBody] JObject frmData)
        {
            var province = location.SetDataProvince(frmData, ref message);
            if (message == null)
            {
                res = location.UpdateProvince(province);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UpdateDistrict")]
        public object UpdateDistrict([FromBody] JObject frmData)
        {
            var district = location.SetDataDistrict(frmData, ref message);
            if (message == null)
            {
                res = location.UpdateDistrict(district);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UpdateWard")]
        public object UpdateWard([FromBody] JObject frmData)
        {
            var ward = location.SetDataWard(frmData, ref message);
            if (message == null)
            {
                res = location.UpdateWard(ward);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("DeleteProvince")]
        public object DeleteProvince([FromBody] JObject frmData)
        {
            var province = location.SetDataProvince(frmData, ref message);
            if (message == null)
            {
                res = location.DeleteProvince(province);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("DeleteDistrict")]
        public object DeleteDistrict([FromBody] JObject frmData)
        {
            var district = location.SetDataDistrict(frmData, ref message);
            if (message == null)
            {
                res = location.DeleteDistrict(district);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("DeleteWard")]
        public object DeleteWard([FromBody] JObject frmData)
        {
            var ward = location.SetDataWard(frmData, ref message);
            if (message == null)
            {
                res = location.DeleteWard(ward);
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }
    }
}
