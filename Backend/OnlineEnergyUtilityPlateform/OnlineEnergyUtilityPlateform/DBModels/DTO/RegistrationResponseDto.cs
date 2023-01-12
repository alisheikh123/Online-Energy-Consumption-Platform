using System.Collections.Generic;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.DTO
{
    public class RegistrationResponseDto
    {
            public bool IsSuccessfulRegistration { get; set; }
            public IEnumerable<string>? Errors { get; set; }
        
    }
}
