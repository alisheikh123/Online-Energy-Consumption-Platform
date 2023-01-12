using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using Newtonsoft.Json;

namespace Smart_Metering_Device_Simulator.Model
{
    public class CurrentUser
    {

        public string email { get; set; }
        public string firstName { get; set; }
        public string id { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }
        public string roleName { get; set; }
        public string password { get; set; }

    }
    public class RetrieveMultipleResponse
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Id { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public string Password { get; set; }
    }
    public class RetrieveMultipleDeviceResponse
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string MaxHEC { get; set; }
        public string CreationDate { get; set; }
        public string UpdateDate { get; set; }
    }
    public class Value
    {
        [JsonProperty("Value")]
        public string value { get; set; }
        public List<string> Values { get; set; }
    }

    public class Attribute
    {
        public string Key { get; set; }
        public Value Value { get; set; }
    }
}
