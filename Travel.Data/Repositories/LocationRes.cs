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
    public class LocationRes : ILocation
    {
        private readonly TravelContext _db;
        private Response res;
        private Notification message;
        public LocationRes(TravelContext db)
        {
            _db = db;
            res = new Response();
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
                    district.IdProvince = Guid.Parse(idProvince);
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

        public Response GetProvinces()
        {
            try
            {
                var result = _db.Provinces;

                if (result.Count() > 0)
                {
                    res.Content = result;
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

        public Response GetDistrict(District district)
        {
            try
            {
                var result = _db.Districts.Where(x => x.IdProvince == district.IdProvince);

                if (result.Count() > 0)
                {
                    res.Content = result;
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

        public Response GetWard(Ward ward)
        {
            try
            {
                var result = _db.Wards.Where(x => x.IdDistrict == ward.IdDistrict);

                if (result.Count() > 0)
                {
                    res.Content = result;
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

        public Response InsertProvince(Province province)
        {
            try
            {
                province.Id = Guid.NewGuid();
                _db.Provinces.Add(province);
                _db.SaveChanges();

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

        public Response InsertDistrict(District district)
        {
            try
            {
                district.Id = Guid.NewGuid();
                _db.Districts.Add(district);
                _db.SaveChanges();

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

        public Response InsertWard(Ward ward)
        {
            try
            {
                ward.Id = Guid.NewGuid();
                _db.Wards.Add(ward);
                _db.SaveChanges();

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

        public Response UpdateProvince(Province province)
        {
            try
            {
                var check = _db.Provinces.Find(province.Id);
                if (check != null)
                {
                    _db.Provinces.Find(province.Id).Name = province.Name;
                    _db.SaveChanges();

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

        public Response UpdateDistrict(District district)
        {
            try
            {
                var check = _db.Districts.Find(district.Id);
                if (check != null)
                {
                    _db.Districts.Find(district.Id).Name = district.Name;
                    _db.Districts.Find(district.Id).IdProvince = district.IdProvince;
                    _db.SaveChanges();

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

        public Response UpdateWard(Ward ward)
        {
            try
            {
                var check = _db.Wards.Find(ward.Id);
                if (check != null)
                {
                    _db.Wards.Find(ward.Id).Name = ward.Name;
                    _db.Wards.Find(ward.Id).IdDistrict = ward.IdDistrict;
                    _db.SaveChanges();

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
        public Response DeleteProvince(Province province)
        {
            try
            {
                var check = _db.Provinces.Find(province.Id);
                if (check != null)
                {
                    _db.Provinces.Remove(check);
                    _db.SaveChanges();

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

        public Response DeleteDistrict(District district)
        {
            try
            {
                var check = _db.Districts.Find(district.Id);
                if (check != null)
                {
                    _db.Districts.Remove(check);
                    _db.SaveChanges();

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

        public Response DeleteWard(Ward ward)
        {
            try
            {
                var check = _db.Wards.Find(ward.Id);
                if (check != null)
                {
                    _db.Wards.Remove(check);
                    _db.SaveChanges();

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
