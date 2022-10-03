using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Travel.Context.Extensions;

namespace Travel.Context.Models.Travel
{
    public class TravelContext : DbContext
    {
        public TravelContext(DbContextOptions<TravelContext> options) : base(options) { }

        public TravelContext() { }

        public DbSet<CostTour> CostTours { get; set; }
        public DbSet<TourDetail> TourDetails { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Contract> Contracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Seed();
            modelBuilder.Entity<TourDetail>(entity =>
            {
                entity.HasOne<CostTour>(e => e.CostTour)
                  .WithOne(e => e.TourDetails)
                  .HasForeignKey<CostTour>(e => e.IdTourDetail);

                entity.Property(e => e.Description).HasMaxLength(300);
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
            });

            modelBuilder.Entity<Restaurant>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(15);
            });

            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(15);
            });

            modelBuilder.Entity<Voucher>(entity =>
            {
                entity.Property(e => e.IsDelete).IsRequired().HasDefaultValueSql("0");
                entity.Property(e => e.Description).HasMaxLength(100);
            });

            modelBuilder.Entity<Banner>(entity =>
            {

            });

            modelBuilder.Entity<Contract>(entity =>
            {

            });
        }


    }
}
