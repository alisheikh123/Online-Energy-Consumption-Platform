using ConsumerWebAPI.Controllers;
using ConsumerWebAPI.Model;
using Microsoft.AspNetCore.Connections;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace ConsumerWebAPI.Extention
{
    public static class DataReader
    {
        public static void GetData()
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            channel.QueueDeclare(queue: "letterbox", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = JsonConvert.DeserializeObject<ChartModel>(Encoding.UTF8.GetString(body));
                Console.WriteLine($"Message Received:{message}");
            };

            channel.BasicConsume(queue: "letterbox", autoAck: true, consumer: consumer);
            Console.ReadKey();
        }
    }
}
