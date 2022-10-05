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
    public class NewsController : Controller
    {
        private INews news;
        private Responsive res;
        public NewsController(INews _news)
        {
            news = _news;
            res = new Responsive();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UploadBanner")]
        public object UploadBanner(IFormCollection frmdata, ICollection<IFormFile> files)
        {
            try
            {
                res.Notification = news.UploadBanner(frmdata, files);

                return Ok(res);
            }
            catch (Exception)
            {
                return Ok(res);
            }
        }
    }
}
