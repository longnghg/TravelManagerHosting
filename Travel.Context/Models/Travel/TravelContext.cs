using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasOne(e => e.Tourbooking)
                .WithMany(d => d.Payment)
                .HasForeignKey(e => e.IdTourBooking);
            });

            // tourbooking
            modelBuilder.Entity<Tourbooking>(entity =>
            {
                entity.HasOne(e => e.TourbookingDetails)
                .WithOne(e => e.Tourbooking)                             
                .HasForeignKey<TourbookingDetails>(e => e.IdTourBooking);

                entity.Property(e => e.Email).HasDefaultValue("");
                entity.Property(e => e.Address).HasMaxLength(100);
                entity.Property(e => e.Phone1).HasMaxLength(14);
                //entity.Property(e => e.TourbookingDetails).IsRequired(true);
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.HasOne(e => e.Province)
                .WithMany(d => d.Districts)
                .HasForeignKey(e => e.IdProvice);
                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<Ward>(entity =>
            {
                entity.HasOne(e => e.District)
                .WithMany(e => e.Ward)
                .HasForeignKey(e => e.IdDistrict);
                entity.Property(e => e.Name).HasMaxLength(30);
            });
        }
        
    }
}
