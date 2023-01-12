using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smart_Metering_Device_Simulator.Model
{
    public class EnergyConsumptionDto
    {
            public string Name { get; set; }
       
    }
    public class AddEngergyConsumptionDto
    {
        public string UserId;
        public string DeviceId;
        public string EnergyConsumption;
        public string Hours;
        public DateTime CurrentDate;
        public int Count;
    }
}
