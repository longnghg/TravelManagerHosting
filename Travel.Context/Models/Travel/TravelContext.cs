using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Extensions;

namespace Travel.Context.Models.Travel
{
    public class TravelContext : DbContext
    {
        public TravelContext(DbContextOptions<TravelContext> options) : base(options) { }

        public TravelContext() { }

        //protected override void OnModelCreating(ModelBuilder modelBuilder) 
        //{
        //    modelBuilder.Seed();
        //}


    }
}
