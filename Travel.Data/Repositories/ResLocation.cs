using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.Linq;
using System.Text.Json;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;
using Travel.Shared.ViewModels;

namespace Travel.Data.Repositories
{
    public class ResLocation : ILocation
    {
        private readonly TravelContext context;
        private Responsive res;
        private Notification message;
        public ResLocation(TravelContext _context)
        {
            context = _context;
            res = new Responsive();
            message = new Notification();
        }

        public Province SetDataProvince(JObject frmData, ref Notification _message)
        {
                Province province = new Province();
            try
            {
                var id = PrCommon.GetString("Id", frmData);
                if (!String.IsNullOrEmpty(id))
                {
                    province.Id = Guid.Parse(PrCommon.GetString("Id", frmData));
                }
                
                province.Name = PrCommon.GetString("Name", frmData);
                return province;
            }
            catch (Exception e)
            {
                message.DateTime = DateTime.Now;
                message.Description = e.Message;
                message.Messenge = "Có lỗi xảy ra !";
                message.Type = "Error";

                _message = message;
                return province;
            }
        }

        public District SetDataDistrict(JObject frmData, ref Notification _message)
        {
            District district = new District();
            try
            {
                var id = PrCommon.GetString("Id", frmData);
                if (!String.IsNullOrEmpty(id))
                {
                    district.Id = Guid.Parse(PrCommon.GetString("Id", frmData));
                }

                var idProvince = PrCommon.GetString("IdProvince", frmData);
                if (!String.IsNullOrEmpty(idProvince))
                {
                    district.IdProvice = Guid.Parse(idProvince);
                }
              
                district.Name = PrCommon.GetString("Name", frmData);
                return district;
            }
            catch (Exception e)
            {
                message.DateTime = DateTime.Now;
                message.Description = e.Message;
                message.Messenge = "Có lỗi xảy ra !";
                message.Type = "Error";

                _message = message;
                return district;
            }
        }

        public Ward SetDataWard(JObject frmData, ref Notification _message)
        {
            Ward ward = new Ward();
            try
            {
                var id = PrCommon.GetString("Id", frmData);
                if (!String.IsNullOrEmpty(id))
                {
                    ward.Id = Guid.Parse(PrCommon.GetString("Id", frmData));
                }

                var idDistrict = PrCommon.GetString("IdDistrict", frmData);
                if (!String.IsNullOrEmpty(idDistrict))
                {
                    ward.IdDistrict = Guid.Parse(idDistrict);
                }

                ward.Name = PrCommon.GetString("Name", frmData);
                return ward;
            }
            catch (Exception e)
            {
                message.DateTime = DateTime.Now;
                message.Description = e.Message;
                message.Messenge = "Có lỗi xảy ra !";
                message.Type = "Error";

                _message = message;
                return ward;
            }
        }

        public Responsive GetProvinces()
        {
            try
            {
                var result = context.Provinces;

                if (result.Count() > 0)
                {
                    res.Content = JsonSerializer.Serialize(result);
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không có dữ liệu trả về !";
                    res.Notification.Type = "Warning";
                }
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive GetDistrict(District district)
        {
            try
            {
                var result = context.Districts.Where(x => x.IdProvice == district.IdProvice);

                if (result.Count() > 0)
                {
                    res.Content = JsonSerializer.Serialize(result);
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không có dữ liệu trả về !";
                    res.Notification.Type = "Warning";
                }
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive GetWard(Ward ward)
        {
            try
            {
                var result = context.Wards.Where(x => x.IdDistrict == ward.IdDistrict);

                if (result.Count() > 0)
                {
                    res.Content = JsonSerializer.Serialize(result);
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không có dữ liệu trả về !";
                    res.Notification.Type = "Warning";
                }
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive InsertProvince(Province province)
        {
            try
            {
                province.Id = Guid.NewGuid();
                context.Provinces.Add(province);
                context.SaveChanges();

                res.Notification.DateTime = DateTime.Now;
                res.Notification.Messenge = "Thêm thành công !";
                res.Notification.Type = "Success";
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive InsertDistrict(District district)
        {
            try
            {
                district.Id = Guid.NewGuid();
                context.Districts.Add(district);
                context.SaveChanges();

                res.Notification.DateTime = DateTime.Now;
                res.Notification.Messenge = "Thêm thành công !";
                res.Notification.Type = "Success";
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive InsertWard(Ward ward)
        {
            try
            {
                ward.Id = Guid.NewGuid();
                context.Wards.Add(ward);
                context.SaveChanges();

                res.Notification.DateTime = DateTime.Now;
                res.Notification.Messenge = "Thêm thành công !";
                res.Notification.Type = "Success";
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive UpdateProvince(Province province)
        {
            try
            {
                var check = context.Provinces.Find(province.Id);
                if (check != null)
                {
                    context.Provinces.Find(province.Id).Name = province.Name;
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Sửa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }

                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive UpdateDistrict(District district)
        {
            try
            {
                var check = context.Districts.Find(district.Id);
                if (check != null)
                {
                    context.Districts.Find(district.Id).Name = district.Name;
                    context.Districts.Find(district.Id).IdProvice = district.IdProvice;
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Sửa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }

                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive UpdateWard(Ward ward)
        {
            try
            {
                var check = context.Wards.Find(ward.Id);
                if (check != null)
                {
                    context.Wards.Find(ward.Id).Name = ward.Name;
                    context.Wards.Find(ward.Id).IdDistrict = ward.IdDistrict;
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Sửa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }
                
                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }
        public Responsive DeleteProvince(Province province)
        {
            try
            {
                var check = context.Provinces.Find(province.Id);
                if (check != null)
                {
                    context.Provinces.Remove(check);
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Xóa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }

                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive DeleteDistrict(District district)
        {
            try
            {
                var check = context.Districts.Find(district.Id);
                if (check != null)
                {
                    context.Districts.Remove(check);
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Xóa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }

                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }

        public Responsive DeleteWard(Ward ward)
        {
            try
            {
                var check = context.Wards.Find(ward.Id);
                if (check != null)
                {
                    context.Wards.Remove(check);
                    context.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Xóa thành công !";
                    res.Notification.Type = "Success";
                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Không tìm thấy !";
                    res.Notification.Type = "Warning";
                }

                return res;
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Có lỗi xảy ra !";
                res.Notification.Type = "Error";
                return res;
            }
        }
    }
}
