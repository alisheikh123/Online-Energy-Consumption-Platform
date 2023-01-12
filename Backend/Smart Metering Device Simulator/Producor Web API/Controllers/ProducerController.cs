using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Producor_Web_API.Model;
using RabbitMQ.Client;
using System.Text;
using System.Text.RegularExpressions;

namespace Producor_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducerController : ControllerBase
    {
        public ProducerController()
        {

        }
        [HttpPost]
        public IActionResult GetDesktopAppData(AddEngergyConsumptionDto model)
        {
            //ConnectionFactory factory = new ConnectionFactory();
            // "guest"/"guest" by default, limited to localhost connections
            //factory.UserName = "ale";
            //factory.Password = "1234";
            //factory.VirtualHost = "demohost";
            //factory.HostName = "producerwebapi.applewoodofficial.com";

            //IConnection connection = factory.CreateConnection();

            var factory = new ConnectionFactory { HostName = "localhost" };
            var conn = factory.CreateConnection();

            //ConnectionFactory factory = new ConnectionFactory();
            //factory.UserName = "alisheikh";
            //factory.Password = "alisheikh";
            //factory.VirtualHost = "/";
            //factory.HostName = "rabbitmq://3.135.27.91";
            //factory.Port = 15672;
            //IConnection conn = factory.CreateConnection();


            var channel = conn.CreateModel();
            channel.QueueDeclare(queue: "letterbox", durable: false, exclusive: false, autoDelete: false, arguments: null);
            var message = JsonConvert.SerializeObject(model);
            var encodeMessage = Encoding.Default.GetBytes(JsonConvert.SerializeObject(Regex.Replace(message, @"\s+", "")));
            channel.BasicPublish("", "letterbox", null, encodeMessage);
        



            return Ok();
        }
    }
}
