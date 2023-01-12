using System.Collections.Generic;

namespace OnlineEnergyUtilityPlateformAPI.DBModels.DTO
{
    public class EntityResponseModel<T>
    {
        public string StatusCode { get; set; }
        public object Data { get; set; }
        public string Message { get; set; }

        public EntityResponseModel()
        {
            StatusCode = "";
            Data = default;
            Message = "";

        }
    }

    public class EntityResponseListModel<T>
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public List<T> Data { get; set; }
        public EntityResponseListModel()
        {
            StatusCode = "";
            Data = new List<T>();
            Message = "";
        }
    }
}
