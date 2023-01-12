using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.Model
{
    public class AfterMappingStoredHourEnergy
    {
        [Key]
        public int Id { get; set; }
        public double Hours { get; set; }
        public string EnergyConsumption { get; set; }
        public int DeviceId { get; set; }
        public Guid? UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
