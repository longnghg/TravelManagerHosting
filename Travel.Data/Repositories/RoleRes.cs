using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;
using Travel.Shared.Ultilities;
using Travel.Shared.ViewModels;
using Travel.Shared.ViewModels.Travel;

namespace Travel.Data.Repositories
{
    public class RoleRes: IRole
    {
        private readonly TravelContext _db;
        private Notification message;
        private Response res;
        public RoleRes(TravelContext db)
        {
            _db = db;
            message = new Notification();
            res = new Response();
        }

        public CreateUpdateRoleViewModel CheckBeforSave(JObject frmData, ref Notification _message)
        {
             CreateUpdateRoleViewModel role = new CreateUpdateRoleViewModel();

            try
            {
                var idRole = PrCommon.GetString("idRole", frmData);
                if (!String.IsNullOrEmpty(idRole))
                {
                    role.IdRole = Int32.Parse(idRole);
                }

                var roleName = PrCommon.GetString("NameRole", frmData);
                if (!String.IsNullOrEmpty(roleName))
                {
                    role.RoleName = roleName;
                }

                var description = PrCommon.GetString("description", frmData);
                if (!String.IsNullOrEmpty(description))
                {
                    role.Description = description;
                }
                return role;
            }
            catch (Exception e) 
            {
                message.DateTime = DateTime.Now;
                message.Description = e.Message;
                message.Messenge = "Có lỗi xảy ra !";
                message.Type = "Error";

                _message = message;
                return role;
            }
        }

        public Response ViewAll()
        {
            try
            {
                var listRole= (from x in _db.Roles where x.IsDelete == false select x).ToList();
                var result = Mapper.MapRole(listRole);
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

        public Response Create(CreateUpdateRoleViewModel input)
        {
            try
            {
                Role role = new Role();
                role = Mapper.MapCreateRole(input);
                _db.Roles.Add(role);
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
        public Response Update(CreateUpdateRoleViewModel input)
        {

            try
            {
                Role role = new Role();
                role = Mapper.MapCreateRole(input);
                _db.Update(role);
                _db.SaveChanges();

                res.Notification.DateTime = DateTime.Now;
                res.Notification.Messenge = "Sửa thành công !";
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

        public Response Restore(CreateUpdateRoleViewModel input)
        {

            try
            {
                Role role = new Role();
                role = Mapper.MapCreateRole(input);

                var check = _db.Roles.Find(role.IdRole);
                if (check != null)
                {
                    _db.Roles.Find(role.IdRole).IsDelete = false;
                    _db.SaveChanges();

                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Messenge = "Restore thành công !";
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
