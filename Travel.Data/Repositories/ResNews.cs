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
    public class ResNews: INews
    {
        private readonly TravelContext context;
        private  Banner banner;
        private Notification message;
        public ResNews(TravelContext _context)
        {
            context = _context;
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
                    context.Banners.Add(banner);
                    context.SaveChanges();
                    int i = 0;
                    foreach (var file in files)
                    {
                        var image = Ultility.WriteFile(file, "Banners", Id, ref message);
                        if (message != null)
                        {
                            i++;
                            message.Messenge = message.Messenge + " ("+ i +")";
                        }
                        else
                        {
                            context.Images.Add(image);
                            context.SaveChanges();
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

    
    }
}
