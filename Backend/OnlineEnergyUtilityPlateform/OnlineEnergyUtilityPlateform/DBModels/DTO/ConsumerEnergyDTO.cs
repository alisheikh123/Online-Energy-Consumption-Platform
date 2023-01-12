using MessagePack.Formatters;
using System;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.DTO
{
    public class ConsumerEnergyDTO
    {
        public int count { get; set; }
        public DateTime? currentDate { get; set; }
        public string Hours { get; set; }
        public string EnergyConsumption { get; set; }
        public string DeviceId { get; set; }
        public Guid? UserId { get; set; }

    }
}
