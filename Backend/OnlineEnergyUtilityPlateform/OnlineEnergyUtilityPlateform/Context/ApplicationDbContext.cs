using OnlineEnergyUtilityPlateformAPI.DBModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using OnlineEnergyUtilityPlateformAPI.DBModels.Model;
using System.Collections.Generic;

namespace OnlineEnergyUtilityPlateformAPI.Context
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }



        public DbSet<UserDeviceMappingTbl> UserDeviceMappingTbls { get; set; }

        public DbSet<DeviceTbl> DeviceTbls { get; set; }
        public DbSet<AfterMappingStoredHourEnergy> AfterMappingStoredHourEnergy { get; set; }

    }

    public class YourDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("your connection string");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
