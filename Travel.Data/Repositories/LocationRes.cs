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
                var id = PrCommon.GetString("IdProvince", frmData);
                if (!String.IsNullOrEmpty(id))
                {
                    province.IdProvince = Guid.Parse(PrCommon.GetString("IdProvince", frmData));
                }

                province.NameProvince = PrCommon.GetString("nameProvince", frmData);
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
                    district.IdDistrict = Guid.Parse(PrCommon.GetString("IdDistrict", frmData));
                }

                var provinceId = PrCommon.GetString("ProvinceId", frmData);
                if (!String.IsNullOrEmpty(provinceId))
                {
                    district.ProvinceId = Guid.Parse(provinceId);
                }

                district.NameDistrict = PrCommon.GetString("Name", frmData);
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
                    ward.IdWard = Guid.Parse(PrCommon.GetString("Id", frmData));
                }

                var districtId = PrCommon.GetString("DistrictId", frmData);
                if (!String.IsNullOrEmpty(districtId))
                {
                    ward.DistrictId = Guid.Parse(districtId);
                }

                ward.NameWard = PrCommon.GetString("NameWard", frmData);
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
                var result = _db.Provinces.ToList();

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
                var result = _db.Districts.Where(x => x.ProvinceId == district.ProvinceId);

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
                var result = _db.Wards.Where(x => x.DistrictId == ward.DistrictId);

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
                province.IdProvince = Guid.NewGuid();
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
                district.IdDistrict = Guid.NewGuid();
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
                ward.IdWard = Guid.NewGuid();
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
                var check = _db.Provinces.Find(province.IdProvince);
                if (check != null)
                {
                    _db.Provinces.Find(province.IdProvince).NameProvince = province.NameProvince;
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
                var check = _db.Districts.Find(district.IdDistrict);
                if (check != null)
                {
                    _db.Districts.Find(district.IdDistrict).NameDistrict = district.NameDistrict;
                    _db.Districts.Find(district.IdDistrict).ProvinceId = district.ProvinceId;
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
                var check = _db.Wards.Find(ward.IdWard);
                if (check != null)
                {
                    _db.Wards.Find(ward.IdWard).NameWard = ward.NameWard;
                    _db.Wards.Find(ward.IdWard).DistrictId = ward.DistrictId;
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
                var check = _db.Provinces.Find(province.IdProvince);
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
                var check = _db.Districts.Find(district.IdDistrict);
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
                var check = _db.Wards.Find(ward.IdWard);
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
