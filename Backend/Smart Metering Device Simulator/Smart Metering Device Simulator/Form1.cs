using CsvHelper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
using RabbitMQ.Client;
using Smart_Metering_Device_Simulator.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Dynamic;
using System.Globalization;
using System.IO;

using System.Linq;
using System.Net.Http;
using System.Runtime.Remoting.Contexts;
using System.Security.Policy;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ProgressBar;

namespace Smart_Metering_Device_Simulator
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
          
        }
        AddEngergyConsumptionDto obj = new AddEngergyConsumptionDto();
        private async void button1_Click(object sender, EventArgs e)
        {
            List<UserName> usersList = new List<UserName>();
            using (var client = new HttpClient())
            {
                
                string url = "https://applewoodofficial.com/api/accounts/GetUsersdesktop";
                using (var response = await client.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var fileJsonString = await response.Content.ReadAsStringAsync();
                        
                         var result = JsonConvert.DeserializeObject<object>(fileJsonString).ToString();
                         var objResponse = JsonConvert.DeserializeObject<List<RetrieveMultipleResponse>>(result);
                        
                        
                        foreach (var item in objResponse)
                        {
                            if (item.RoleName=="Client")
                            {
                                usersList.Add(new UserName() { Id = item.Id.ToString(), UserNm = item.UserName });
                            }
                        }


                    }
                }
            }






           
            

          


            //devicesList.Add(new Device() { Id = "3", DeviceNm = "Register" });
            //devicesList.Add(new Device() { Id = "4", DeviceNm = "Mobile" });
            //devicesList.Add(new Device() { Id = "2", DeviceNm = "Song " });
            //devicesList.Add(new Device() { Id = "1", DeviceNm = "Headphones" });

            // Assign to specific combobox
            //cboDevice.Items.Clear();
            cboUserName.Items.Clear();


            cboUserName.DataSource = usersList;
            cboUserName.ValueMember = "Id";
            cboUserName.DisplayMember = "UserNm";
            

            //cboDevice.DataSource = devicesList;
            //cboDevice.ValueMember = "Id";
            //cboDevice.DisplayMember = "DeviceNm";


           



        }

         private async void afterSelectUserName(UserName userDetail)
        {
           
            List<Device> devicesList = new List<Device>();
            using (var client = new HttpClient())
            {

                string url = "https://applewoodofficial.com/api/DeviceTbls/GetDevicesDesktop/" + userDetail.Id;
                using (var response = await client.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var JsonString = await response.Content.ReadAsStringAsync();

                        var result = JsonConvert.DeserializeObject<object>(JsonString).ToString();
                        var objResponse = JsonConvert.DeserializeObject<List<RetrieveMultipleDeviceResponse>>(result);


                        foreach (var item in objResponse)
                        {
                                devicesList.Add(new Device() { Id = item.Id.ToString(), DeviceNm = item.Description });
                        }


                    }
                }

               


                cboDevice.DataSource = devicesList;
                cboDevice.ValueMember = "Id";
                cboDevice.DisplayMember = "DeviceNm";
            }
        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void cboUserName_SelectedIndexChanged(object sender, EventArgs e)
        {
            UserName usObject = (UserName)cboUserName.SelectedItem;
            lblValue.Text= cboUserName.Text;
            obj.UserId = cboUserName.SelectedValue.ToString();

            afterSelectUserName(usObject);
        }

        private void cboDevice_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblDevice.Text = cboDevice.Text;
            obj.DeviceId = cboDevice.SelectedValue.ToString();
        }

        private async void genbtn_Click(object sender, EventArgs e)
        {
      


            try
            {
                var path = @"D:\upwork\Alexandra Varga\DS2022_Group_LastName_FirstName_Assignment_Number\Backend\Smart Metering Device Simulator\Smart Metering Device Simulator\File\sensor2.csv";

               

                using (var reader = new StreamReader(path, Encoding.Default))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    //AddEngergyConsumptionDto obj = new AddEngergyConsumptionDto();
                    var records = csv.GetRecords<EnergyConsumptionDto>().ToList();
                    for (int i = 0; i < records.Count; i++)
                    {
                        obj.EnergyConsumption = records[i].Name.ToString();
                        obj.CurrentDate = DateTime.Now;
                        obj.Hours = "0.16";
                        var model = new AddEngergyConsumptionDto
                        {
                            UserId = obj.UserId,
                            DeviceId = obj.DeviceId,
                            EnergyConsumption = obj.EnergyConsumption,
                            Hours = obj.Hours,
                            CurrentDate = obj.CurrentDate,
                            Count = records.Count()

                        };
                        var json = JsonConvert.SerializeObject(model);
                        var data = new StringContent(json, Encoding.UTF8, "application/json");
                        //string url = "https://producerwebapi.applewoodofficial.com/api/Producer";
                        //string url = "https://localhost:7174/api/Producer";
                        string url = "http://172.29.208.1:85/api/Producer";
                        //var message = JsonConvert.SerializeObject(jsonmessage);
                        using (var client = new HttpClient())
                       {
                            using (var response = await client.PostAsync(url, data))
                            {
                                var result = await response.Content.ReadAsStringAsync();
                            }
                        }
                       
                        await Task.Delay(10000);
                        //await Task.Delay(600000);

                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
