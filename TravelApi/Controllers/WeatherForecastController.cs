using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Context.Models.Travel;
using Travel.Shared;
using Travel.Shared.Ultilities;

namespace TravelApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly TravelContext _db;
        public WeatherForecastController(TravelContext db)
        {
            _db = db;
        }
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet]
        public object Get()
        {
            try
            {
                var lsEmployee = _db.Employees.Include(x => x.Role).Include(x => x.Schedules).AsNoTracking().ToList();

                var showLsEmployee = Mapper.MapEmployee(lsEmployee);

                var rng = new Random();
                return Ok(showLsEmployee);
            }
            catch (Exception e)
            {

                return Ok(e.Message);
            }
        }
    }
}
