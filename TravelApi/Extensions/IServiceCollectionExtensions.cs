using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Context.Models.Notification;
using Travel.Context.Models.Travel;

namespace TravelApi.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure DbContext with Scoped lifetime
            services.AddDbContext<NotificationContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("notificationEntities"));
            }
            );

            services.AddDbContext<TravelContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("travelEntities"));
            });
            return services;
        }

    }
}
