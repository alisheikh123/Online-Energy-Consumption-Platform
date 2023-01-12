using System;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.DTO
{
    public class ReportDtoModel
    {
        public Guid? userId { get; set; }
        public string? deviceId { get; set; }
        public string? date { get; set; }
    }
}
