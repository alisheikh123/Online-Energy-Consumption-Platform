﻿namespace OnlineEnergyUtilityPlateformAPI.DBModels.DTO
{
    public class UserListDto
    {

        public string Email { get; set; }

        public string FirstName { get; set; }
        public string Id { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public string? Password { get; set; }
    }
}
