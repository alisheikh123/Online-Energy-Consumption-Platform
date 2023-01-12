using System.Reflection.PortableExecutable;

namespace ConsumerWebAPI.Model
{
    public class ChartModel
    {
        
        public string UserId { get; set; }
        public string DeviceId { get; set; }
        public string EnergyConsumption { get; set; }
        public string Hours { get; set; }
        public DateTime CurrentDate { get; set; }
        public int Count { get; set; }

        
    }
    public class RootObject
    {
        public List<ChartModel> data { get; set; }

        public RootObject()
        {
            data= new List<ChartModel>();   
        }
    }

}
