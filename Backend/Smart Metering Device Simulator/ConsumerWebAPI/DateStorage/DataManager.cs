using ConsumerWebAPI.Model;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using RestSharp;

namespace ConsumerWebAPI.DateStorage
{
    public static class DataManager
    {
        public static List<ChartModel> GetData()
        {

            var chartList =new  List<ChartModel>();
            ChartModel chartModel = new ChartModel();

            var factory = new ConnectionFactory { HostName = "localhost" };
            var conn = factory.CreateConnection();
            // Here Latest one 
            //ConnectionFactory factory = new ConnectionFactory();
            //factory.UserName = "guest";
            //factory.Password = "guest";
            //factory.VirtualHost = "/";
            //factory.HostName = "rabbitmq://localhost";
            ////factory.Port = 15672;
            //IConnection conn = factory.CreateConnection();

            //var factory = new ConnectionFactory { HostName = "localhost" };

            //using var connection = factory.CreateConnection();
            using var channel = conn.CreateModel();

            channel.QueueDeclare(queue: "letterbox", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

           
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = JsonConvert.DeserializeObject<string>(Encoding.UTF8.GetString(body));
               
                    JObject json = JObject.Parse(message);
                    chartModel.UserId = (string) json["UserId"];
                    chartModel.DeviceId = (string) json["DeviceId"];
                    chartModel.EnergyConsumption = (string) json["EnergyConsumption"];
                    chartModel.Hours = (string) json["Hours"];
                    chartModel.CurrentDate = (DateTime) json["CurrentDate"];
                    chartModel.Count = (int)json["Count"];


                chartList.Add(chartModel);

            };
               channel.BasicConsume(queue: "letterbox", autoAck: true, consumer: consumer);
            return chartList;
        }
    }
}
