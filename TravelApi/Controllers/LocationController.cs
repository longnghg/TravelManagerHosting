using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data.Interfaces;
using Travel.Shared.ViewModels;
using TravelApi.Hubs;

namespace TravelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILocation location;
        private Notification message;
        private Response res;
        private IHubContext<TravelHub, ITravelHub> _messageHub;

        public LocationController(ILocation _location
             , IHubContext<TravelHub, ITravelHub> messageHub)
        {
            location = _location;
            res = new Response();
            _messageHub = messageHub;

        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get-province")]
        public  object GetProvince()
        {
       
            res = location.GetProvinces();
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("get-district")]
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
        [Route("get-ward")]
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
        [Route("insert-province")]
        public object InsertProvince([FromBody] JObject frmData)
        {
            var province = location.SetDataProvince(frmData, ref message);
            if (message == null)
            {
                res = location.InsertProvince(province);
                _messageHub.Clients.All.Insert();
            }
            else
            {
                res.Notification = message;
            }
            return Ok(res);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("insert-district")]
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
        [Route("insert-ward")]
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
        [Route("update-province")]
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
        [Route("update-district")]
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
        [Route("update-ward")]
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
