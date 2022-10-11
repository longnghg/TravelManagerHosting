using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;
using Travel.Shared.Ultilities;
using Travel.Shared.ViewModels;
using Travel.Shared.ViewModels.Travel;
using static Travel.Shared.Ultilities.Enums;

namespace Travel.Data.Repositories
{
    public class EmployeeRes : IEmployee
    {
        private readonly TravelContext _db;
        private Notification message;
        private Response res;
        public EmployeeRes(TravelContext db)
        {
            _db = db;
            message = new Notification();
            res = new Response();
        }
        // validate vd create
        public CreateUpdateEmployeeViewModel CheckBeforeSave(JObject frmData, ref Notification _message) // hàm đăng nhập  sử cho create update delete
        {
            CreateUpdateEmployeeViewModel employee = new CreateUpdateEmployeeViewModel();
            try
            {
      
                var id = PrCommon.GetString("idEmployee", frmData);
                if (!String.IsNullOrEmpty(id))
                {
                    employee.IdEmployee = Guid.Parse(id);
                }


                var name = PrCommon.GetString("nameEmployee", frmData);
                if (!String.IsNullOrEmpty(name))
                {
                    employee.NameEmployee = name;
                }

                var email = PrCommon.GetString("email", frmData);
                if (!String.IsNullOrEmpty(email))
                {
                    employee.Email = email;
                }
                var phone = PrCommon.GetString("Phone", frmData);
                if (!String.IsNullOrEmpty(phone))
                {
                    employee.Phone = phone;
                }

                var birthday = PrCommon.GetString("birthday", frmData);
                if (!String.IsNullOrEmpty(birthday))
                {
                    employee.Birthday = long.Parse(birthday);
                }

                var image = PrCommon.GetString("image", frmData);
                if (!String.IsNullOrEmpty(image))
                {
                    employee.Image = image;
                }

                var roleid = PrCommon.GetString("roleId", frmData);
                if (!String.IsNullOrEmpty(roleid))
                {
                    employee.RoleId = roleid.ToEnum<TitleRole>();
                }
                //res.KwId = PrCommon.GetString("KwId", frmData);
                //res.KwName = PrCommon.GetString("KwName", frmData);
                //res.KwEmail = PrCommon.GetString("KwEmail", frmData);
                //res.KwPhone = PrCommon.GetString("KwPhone", frmData);
                //res.KwRoleName = PrCommon.GetString("KwRoleName", frmData);
                //res.KwRoleId = PrCommon.GetString("KwRoleId", frmData);
                //res.KwIsActive = PrCommon.GetString("KwIsActive", frmData);

                return employee;
            }
            catch (Exception e)
            {
                message.DateTime = DateTime.Now;
                message.Description = e.Message;
                message.Messenge = "Có lỗi xảy ra !";
                message.Type = "Error";

                _message = message;
                return employee;
            }
        }
        public Response GetEmployees()
        {
            try
            {


                #region đo tốc độ EF và linq
                //var stopWatch4 = Stopwatch.StartNew();
                //var result5 = _db.Employees.ToList();
                //var b4 = stopWatch4.Elapsed;

                //var stopWatch5 = Stopwatch.StartNew();
                //var result6 = (from x in _db.Employees select x).ToList();
                //var b5 = stopWatch5.Elapsed;
                #endregion

                var listEmp = (from x in _db.Employees where x.IsDelete == false orderby x.Role select x).ToList();
                var result = Mapper.MapEmployee(listEmp);

                if (listEmp.Count() > 0)
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
        public Response Create(CreateUpdateEmployeeViewModel input)
        {
            try
            {
                Employee employee = Mapper.MapCreateEmployee(input);

                employee.IdEmployee = Guid.NewGuid();
                employee.CreateDate = 202204101007;
                employee.IsActive = true;
                employee.Password = "3244185981728979115075721453575112";

                _db.Employees.Add(employee);
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

        public Response Update(CreateUpdateEmployeeViewModel input)
        {
            try
            {
                Employee employee = Mapper.MapCreateEmployee(input);
                _db.Employees.Update(employee);
                _db.SaveChanges();
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Messenge = "Sửa thành công";
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

        public Response Search(JObject frmData)
        {
            try
            {
                Keywords keywords = new Keywords();

                var kwId = PrCommon.GetString("idEmployee", frmData);
                if (!String.IsNullOrEmpty(kwId))
                {
                    keywords.KwId = kwId.Trim().ToLower();
                }
                else
                {
                    keywords.KwId = "";

                }

                var kwName = PrCommon.GetString("nameEmployee", frmData).Trim();
                if (!String.IsNullOrEmpty(kwName))
                {
                    keywords.KwName = kwName.Trim().ToLower();
                }
                else
                {
                    keywords.KwName = "";

                }

                var kwPhone = PrCommon.GetString("phone", frmData).Trim();
                if (!String.IsNullOrEmpty(kwPhone))
                {
                    keywords.KwPhone = kwPhone.Trim().ToLower();
                }
                else
                {
                    keywords.KwPhone = "";

                }

                var kwEmail = PrCommon.GetString("email", frmData).Trim();
                if (!String.IsNullOrEmpty(kwEmail))
                {
                    keywords.KwEmail = kwEmail.Trim().ToLower();
                }
                else
                {
                    keywords.KwEmail = "";

                }

                var kwRoleId = PrCommon.GetString("idRole", frmData);
                keywords.KwRoleId = PrCommon.getListInt(kwRoleId, ',', false);

                var kwIsActive = PrCommon.GetString("isActive", frmData);
                if (!String.IsNullOrEmpty(kwId))
                {
                    keywords.KwIsActive = Boolean.Parse(kwIsActive);
                }
                else
                {
                    keywords.KwIsActive = true;

                }
               
                //var listEmp = _db.Employees.FromSqlRaw("[SearchEmployees] {0}, {1}, {2}, {3}, {4}, {5}", kwId, kwName, kwEmail, kwPhone, kwRoleId, kwIsActive).ToList();
                var listEmp = new List<Employee>();
                if (keywords.KwRoleId.Count > 0)
                {
                    listEmp =  (from x in _db.Employees
                     where x.IsDelete == false &&
                                     x.IdEmployee.ToString().ToLower().Contains(keywords.KwId) &&
                                     x.NameEmployee.ToLower().Contains(keywords.KwName) &&
                                     x.Email.ToLower().Contains(keywords.KwEmail) &&
                                     x.Phone.ToLower().Contains(keywords.KwPhone) &&
                                     x.IsActive == keywords.KwIsActive && 
                                     keywords.KwRoleId.Contains(x.RoleId)
                     select x).ToList();
                }
                else
                {
                    listEmp = (from x in _db.Employees
                               where x.IsDelete == false &&
                                               x.IdEmployee.ToString().ToLower().Contains(keywords.KwId) &&
                                               x.NameEmployee.ToLower().Contains(keywords.KwName) &&
                                               x.Email.ToLower().Contains(keywords.KwEmail) &&
                                               x.Phone.ToLower().Contains(keywords.KwPhone) &&
                                               x.IsActive == keywords.KwIsActive
                               select x).ToList();
                }
                var result = Mapper.MapEmployee(listEmp);
                if (listEmp.Count() > 0)
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
    }
}
