namespace Producor_Web_API.Model
{
   
        public class AddEngergyConsumptionDto
        {
            public string UserId { get; set; }
            public string DeviceId { get; set; }
            public string EnergyConsumption { get; set; }
            public string Hours { get; set; }
        public DateTime CurrentDate { get; set; }
        public int Count { get; set; }
    }
    
}
