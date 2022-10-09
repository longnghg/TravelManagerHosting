using Microsoft.EntityFrameworkCore;
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
            

                var email = PrCommon.GetString("Email", frmData);
                if (!String.IsNullOrEmpty(email))
                {
                    employee.Email = email;
                }
                var name = PrCommon.GetString("NameEmployee", frmData);
                if (!String.IsNullOrEmpty(name))
                {
                    employee.NameEmployee = name;
                }
                var phone = PrCommon.GetString("Phone", frmData);
                if (!String.IsNullOrEmpty(phone))
                {
                    employee.NameEmployee = phone;
                }

                var role = PrCommon.GetString("RoleId", frmData);
                if (!String.IsNullOrEmpty(phone))
                {
                    employee.RoleId = role.ToEnum<TitleRole>();
                }




                if (checkAcocountExist)
                {
                    message.Type = "Error";
                    message.DateTime = DateTime.Now;
                    message.Messenge = "Tài khoản đã tồn z";
                   
                }
                else
                {
                    return null;
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

                res.TotalResult = _db.Employees.Where(x => x.IsDelete == false).Count();
                var result = _db.Employees.FromSqlRaw("[SearchEmployees] {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}", res.KwId, res.KwName, res.KwEmail, res.KwPhone, res.KwRoleName, res.KwIsActive, res.PageNumber, res.PageSize).ToList();
                //if (!string.IsNullOrEmpty(res.KwId) || !string.IsNullOrEmpty(res.KwName) || !string.IsNullOrEmpty(res.KwEmail) || !string.IsNullOrEmpty(res.KwPhone) || !string.IsNullOrEmpty(res.KwRoleName) || !string.IsNullOrEmpty(res.KwIsActive))
                //{
                //    res.TotalResult = result.Count();
                //}

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
        public Response CreateEmployees(Employee unit)
        {
            try
            {

                _db.Employees.Add(unit);


                res.TotalResult = _db.Employees.Where(x => x.IsDelete == false).Count();
                var result = _db.Employees.FromSqlRaw("[SearchEmployees] {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}", res.KwId, res.KwName, res.KwEmail, res.KwPhone, res.KwRoleName, res.KwIsActive, res.PageNumber, res.PageSize).ToList();
                //if (!string.IsNullOrEmpty(res.KwId) || !string.IsNullOrEmpty(res.KwName) || !string.IsNullOrEmpty(res.KwEmail) || !string.IsNullOrEmpty(res.KwPhone) || !string.IsNullOrEmpty(res.KwRoleName) || !string.IsNullOrEmpty(res.KwIsActive))
                //{
                //    res.TotalResult = result.Count();
                //}

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
    
        public Response Create(CreateUpdateEmployeeViewModel input)
        {
            try
            {
                Employee employee = Mapper.MapCreateEmployee(input);

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
    }
}
