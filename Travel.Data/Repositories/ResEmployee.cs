using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;
using Travel.Shared.ViewModels;

namespace Travel.Data.Repositories
{
    public class ResEmployee : IEmployee
    {
        private readonly TravelContext context;
        private Notification message;
        private Responsive res;
        public ResEmployee(TravelContext _context)
        {
            context = _context;
            message = new Notification();
            res = new Responsive();
        }

        public Responsive GetEmployees()
        {
            try
            {
                var result = context.Employees.Where(x => x.IsDelete == false);

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
    }
}
