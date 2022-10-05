using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Context.Models;

namespace Travel.Context.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role() { Id = -1, Name = "Admin", Description = "Trùm", IsDelete = false },
                new Role() { Id = 1, Name = "LocalManager", Description = "Quản lý cục bộ", IsDelete = false },
                new Role() { Id = 2, Name = "ServiceManager", Description = "Quản lý dịch vụ", IsDelete = false },
                new Role() { Id = 3, Name = "TourManager", Description = "Quản lý tour", IsDelete = false },
                new Role() { Id = 4, Name = "TourBookingManager", Description = "Quản lý tour booking", IsDelete = false }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee() {Id = Guid.NewGuid(), Name = "Admin Test", Email = "test1@gmail.com", Password = "3244185981728979115075721453575112", Image = "", Phone = "0789786646", RoleId = -1, CreateDate = 202204101007, Birthday = 202204101007, IsActive = true, IsDelete = false, ModifyBy = "Admin Test", ModifyDate = 202204101007 },
                new Employee() { Id = Guid.NewGuid(), Name = "Local Manager Test", Email = "test2@gmail.com", Password = "3244185981728979115075721453575112", Image = "", Phone = "0789786645", RoleId = 1, CreateDate = 202204101007, Birthday = 202204101007, IsActive = true, IsDelete = false, ModifyBy = "Admin Test", ModifyDate = 202204101007 },
                new Employee() { Id = Guid.NewGuid(), Name = "Service Manager Test", Email = "test3@gmail.com", Password = "3244185981728979115075721453575112", Image = "", Phone = "0789786644", RoleId = 2, CreateDate = 202204101007, Birthday = 202204101007, IsActive = true, IsDelete = false, ModifyBy = "Admin Test", ModifyDate = 202204101007 },
                new Employee() { Id = Guid.NewGuid(), Name = "Tour Manager Test", Email = "test4@gmail.com", Password = "3244185981728979115075721453575112", Image = "", Phone = "0789786643", RoleId = 3, CreateDate = 202204101007, Birthday = 202204101007, IsActive = true, IsDelete = false, ModifyBy = "Admin Test", ModifyDate = 202204101007 },
                new Employee() { Id = Guid.NewGuid(), Name = "Tour Booking Manager Test", Email = "test5@gmail.com", Password = "3244185981728979115075721453575112", Image = "", Phone = "0789786642", RoleId = 4, CreateDate = 202204101007, Birthday = 202204101007, IsActive = true, IsDelete = false, ModifyBy = "Admin Test", ModifyDate = 202204101007 }

            );

        }
    }
}
