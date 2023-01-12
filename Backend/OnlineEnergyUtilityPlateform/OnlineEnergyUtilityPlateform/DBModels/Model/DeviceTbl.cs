using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.Model
{
    public class DeviceTbl
    {
        [Key]
        public int id { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string MaxHEC { get; set; }
        public string? CreationDate { get; set; }
        public string? UpdateDate { get; set; }
    }
}
