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
        TravelContext _db;
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
                var li = _db.Employees.Include(x=> x.Role).ToList();

                var ul = Mapper.MapEmployee(li);

                var rng = new Random();
                return Ok(ul);
            }
            catch (Exception e)
            {

                return Ok(e.Message);
            }
        }
    }
}
