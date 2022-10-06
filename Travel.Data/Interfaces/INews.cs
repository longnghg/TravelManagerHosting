using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Shared.ViewModels;

namespace Travel.Data.Interfaces
{
    public interface INews
    {
        Notification UploadBanner(IFormCollection frmdata, ICollection<IFormFile> files);
        Response GetBanners();
    }
}
