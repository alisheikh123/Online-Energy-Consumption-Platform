using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.Model
{
    public class UserDeviceMappingTbl
    {
        [Key]
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public int DeviceId { get; set; }
        public DateTime AssigningDate { get; set; }
    }
}
