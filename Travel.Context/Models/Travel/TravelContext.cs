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
        public TravelContext()
        {
        }

        public TravelContext(DbContextOptions<TravelContext> options)
            : base(options)
        {
        }
        public DbSet<Tourbooking> Tourbookings { get; set; }
        public DbSet<TourbookingDetails> tourbookingDetails { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<CostTour> CostTours { get; set; }
        public DbSet<TourDetail> TourDetails { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        //
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Tour> Tour { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Timeline> Timelines { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasOne(e => e.Tourbooking)
                .WithMany(d => d.Payment)
                .HasForeignKey(e => e.IdTourBooking);
                entity.Property(e => e.Id).HasMaxLength(30);
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Type).HasMaxLength(30);
                entity.Property(e => e.IdTourBooking).HasMaxLength(30);
            });

            // tourbooking
            modelBuilder.Entity<Contract>(entity =>
            {
                entity.Property(e => e.ContractName).HasMaxLength(50);
                entity.Property(e => e.TypeService).HasMaxLength(20);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);
                entity.Property(e => e.CreateBy).HasMaxLength(50);

            });
            modelBuilder.Entity<Tourbooking>(entity =>
            {
                entity.HasOne(e => e.TourbookingDetails)
                .WithOne(e => e.Tourbooking)
                .HasForeignKey<TourbookingDetails>(e => e.IdTourBooking);

                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(14);
                entity.Property(e => e.Pincode).HasMaxLength(10);
                entity.Property(e => e.Id).HasMaxLength(30);
                entity.Property(e => e.CustomerName).HasMaxLength(100);
                entity.Property(e => e.ContactName).HasMaxLength(100);
                entity.Property(e => e.VoucherCode).HasMaxLength(10);
                entity.Property(e => e.ModifyBy).HasMaxLength(100);
                entity.Property(e => e.BookingNo).HasMaxLength(30);



                entity.Property(e => e.Email).IsRequired(true);
                entity.Property(e => e.Phone).IsRequired(true);
            });

            modelBuilder.Entity<TourbookingDetails>(entity =>
            {
                entity.Property(e => e.Pincode).HasMaxLength(10);
                entity.Property(e => e.IdTourBooking).HasMaxLength(30);
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(30);
                entity.Property(e => e.Name).IsRequired(true);

            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.HasOne(e => e.Province)
                .WithMany(d => d.Districts)
                .HasForeignKey(e => e.IdProvince);
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Name).IsRequired(true);

            });

            modelBuilder.Entity<Ward>(entity =>
            {
                entity.HasOne(e => e.District)
                .WithMany(e => e.Ward)
                .HasForeignKey(e => e.IdDistrict);
                entity.Property(e => e.Name).HasMaxLength(30);
                entity.Property(e => e.Name).IsRequired(true);

            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(14);
                entity.Property(e => e.Password).HasMaxLength(255);
                entity.Property(e => e.FbToken).HasMaxLength(550);
                entity.Property(e => e.AccessToken).HasMaxLength(550);
                entity.Property(e => e.GoogleToken).HasMaxLength(550);
                entity.Property(e => e.Name).IsRequired(true);
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired(true);
                entity.Property(e => e.Phone).IsRequired(true);

            });

            modelBuilder.Entity<TourDetail>(entity =>
            {
                entity.HasOne<CostTour>(e => e.CostTour)
                  .WithOne(e => e.TourDetails)
                  .HasForeignKey<CostTour>(e => e.IdTourDetail);

                entity.Property(e => e.Description).HasMaxLength(300);
                entity.Property(e => e.TourId).HasMaxLength(450);
            });

            modelBuilder.Entity<CostTour>(entity =>
            {
                entity.HasOne<Place>(e => e.Place)
                  .WithMany(e => e.CostTours)
                  .HasForeignKey(e => e.IdPlace);

                entity.HasOne<Hotel>(e => e.Hotel)
                  .WithMany(e => e.CostTours)
                  .HasForeignKey(e => e.IdHotel);

                entity.HasOne<Restaurant>(e => e.Restaurant)
                  .WithMany(e => e.CostTours)
                  .HasForeignKey(e => e.IdRestaurant);
            });


            modelBuilder.Entity<Place>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(15);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);

                entity.Property(e => e.Name).IsRequired(true);
                entity.Property(e => e.Phone).IsRequired(true);
                entity.Property(e => e.Address).IsRequired(true);
            });

            modelBuilder.Entity<Restaurant>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(15);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);

                entity.Property(e => e.Name).IsRequired(true);
                entity.Property(e => e.Phone).IsRequired(true);
                entity.Property(e => e.Address).IsRequired(true);
            });

            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(15);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);

                entity.Property(e => e.Name).IsRequired(true);
                entity.Property(e => e.Phone).IsRequired(true);
                entity.Property(e => e.Address).IsRequired(true);
            });

            modelBuilder.Entity<Voucher>(entity =>
            {
                entity.Property(e => e.Point).HasDefaultValue(0);
                entity.Property(e => e.Code).HasMaxLength(20);
                entity.Property(e => e.IsDelete).IsRequired().HasDefaultValue(0);
                entity.Property(e => e.Description).HasMaxLength(100);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);
                entity.Property(e => e.CreateBy).HasMaxLength(50);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired(true); 
                entity.Property(e => e.Email).HasDefaultValue(0);
                entity.Property(e => e.Email).IsRequired(true).HasMaxLength(100);
                entity.Property(e => e.Password).HasMaxLength(255);
                entity.Property(e => e.AccessToken).HasMaxLength(550);
                entity.Property(e => e.Phone).HasMaxLength(15).IsRequired(true);
                entity.Property(e => e.Image).HasMaxLength(100).IsRequired(true);
                entity.Property(e => e.IdSchedule).HasMaxLength(50);
                entity.Property(e => e.ModifyBy).HasMaxLength(50);
            });
            modelBuilder.Entity<Car>(entity =>
            {
                entity.Property(e => e.LiscensePlate).HasMaxLength(15).IsRequired();
                entity.Property(e => e.Phone).HasMaxLength(15).IsRequired();
                entity.Property(e => e.NameDriver).HasMaxLength(15).IsRequired();
                entity.Property(e => e.Status).HasDefaultValue(0);

            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.Property(e => e.Id).HasMaxLength(50);
                entity.HasOne<Car>(e => e.Cars)
                 .WithMany(d => d.Schedules)
                 .HasForeignKey(e => e.IdCar);

                entity.HasOne(e => e.Employee)
               .WithMany(d => d.Schedules)
               .HasForeignKey(e => e.IdEmployee);

                entity.HasOne<Tour>(e => e.Tour)
               .WithMany(d => d.Schedules)
               .HasForeignKey(e => e.IdTour);
            });

            modelBuilder.Entity<Timeline>(entity =>
            {
                entity.HasOne<Schedule>(e => e.Schedule)
               .WithMany(d => d.Timelines)
               .HasForeignKey(e => e.IdSchedule);

                entity.Property(e => e.Description).HasMaxLength(150);
                entity.Property(e => e.ModifyBy).HasMaxLength(100);
                entity.Property(e => e.IdSchedule).HasMaxLength(50);
            });
            modelBuilder.Entity<Tour>(entity =>
            {
        
                entity.Property(e => e.TourName).HasMaxLength(150).IsRequired(true);
                entity.Property(e => e.ModifyBy).HasMaxLength(100);
                entity.Property(e => e.Thumbsnail).HasMaxLength(150);
                entity.Property(e => e.FromPlace).HasMaxLength(100);
                entity.Property(e => e.ToPlace).HasMaxLength(100);
                entity.Property(e => e.ApproveStatus).HasMaxLength(100);
            });
            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.HasOne<Schedule>(e => e.Schedules)
               .WithMany(d => d.Promotions)
               .HasForeignKey(e => e.IdSchedule);
            });
            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(100);

            });
            modelBuilder.Entity<File>(entity =>
            {
                entity.Property(e => e.FileName).HasMaxLength(100).IsRequired(true);
                entity.Property(e => e.FileExtension).HasMaxLength(10);
                entity.Property(e => e.FilePath).HasMaxLength(150);
            }); 
            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired(true);
                entity.Property(e => e.Extension).HasMaxLength(5);
                entity.Property(e => e.FilePath).HasMaxLength(255);
            });
        }

    }
}
