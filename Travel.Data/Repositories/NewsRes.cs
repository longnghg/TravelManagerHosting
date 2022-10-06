using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;
using Travel.Shared.Ultilities;
using Travel.Shared.ViewModels;

namespace Travel.Data.Repositories
{
    public class NewsRes: INews
    {
        private readonly TravelContext _db;
        private  Banner banner;
        private Notification message, _message;
        public NewsRes(TravelContext db)
        {
            _db = db;
            banner =  new Banner();
            message = new Notification();
        }

        public Notification UploadBanner(IFormCollection frmdata, ICollection<IFormFile> files)
        {
            try
            {
                
                if (files.Count > 0)
                {
                    //JObject frmData = JObject.Parse(frmdata["data"]);
                    var Id = Guid.NewGuid();
                    var isActive = true;
                    banner.Id = Id;
                    banner.IsActive = isActive;
                    _db.Banners.Add(banner);
                    _db.SaveChanges();
                    int i = 0;
                    foreach (var file in files)
                    {
                        var image = Ultility.WriteFile(file, "Banners", Id, ref _message);
                        if (_message != null)
                        {
                            i++;
                            message.Messenge = _message.Messenge + " ("+ i +")";
                        }
                        else
                        {
                            _db.Images.Add(image);
                            _db.SaveChanges();
                            message.Messenge = "Upload Banners thành công !";
                            message.DateTime = DateTime.Now;
                            message.Type = "Success";
                        } 
                    }
                }

                return message;
            }
            catch (Exception)
            {
                return message;
            }
        }

        public Response GetBanners()
        {
            throw new NotImplementedException();
        }
        // code ở đây

    }
}
