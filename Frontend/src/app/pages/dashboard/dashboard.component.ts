import { AppService } from '@/shared/services/app.service';
import { SignalRService } from '@/shared/services/signal-r.service';
import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { ChartModel } from '@/Interface/response/ChartModel';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { ApiService } from '@/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
isAdmin:boolean=false;
 linechartData:any;
 dataPoints:any[] = [];
 timeout:any = null;
 xValue:number = 1;
 yValue:number = 10;
 newDataCount:number = 10;
 public data :ChartModel[];
 chartRecord: any = [];

 chart: any;
 private hubConnection:signalR.HubConnection;
 chartOptions = {
   theme: "light2",
   title: {
     text: "Real Time Energy Consumption"
   },
   data: [{
     type: "line",
     dataPoints: this.dataPoints
   }]
 }
  constructor(private appService:AppService,private http:HttpClient,private apiService:ApiService,private _toast:ToastrService) { }


  ngOnInit(): void {

    this.checkRole();

  }
  getSignalR()
  {
    this.startConnection();
    this.addTransferChartDataListener();
    this.SendHttpRequest();
   }


   startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.API2_URL_PREFIX+'chart').build();
    this.hubConnection.start().then(()=>console.log('Connection Started')).catch(err=>console.log('Error while starting connection:'+err))

  }
  addTransferChartDataListener(){
      this.hubConnection.on('transferchartdata',(data:any)=>{

        if(data.length==0 || data[0] == null)
        {

        }
        else
        {

          this.data = data;
          this.addData(data)
        }

      });
    }
    SendHttpRequest(){
      this.apiService.serviceGetConsumer('Chart').then((res)=>{

      })
    }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.getSignalR()
  }

  ngOnDestroy() {

    clearTimeout(this.timeout);
  }
reload(){
  window.location.reload();
}

  addData = (data:any={}) => {
      if(data.length>0) {
        data.forEach( (val:any[]) => {
          this.dataPoints.push({x: new Date(val['currentDate']), y: parseInt(val['energyConsumption'])});
        })
      } else {
        this.dataPoints.shift();
        this.dataPoints.push({x: new Date(data[0]['currentDate']), y: parseInt(data[0]['energyConsumption'])});
        this.yValue = parseInt(data[0]['energyConsumption']);
      }
      this.chart.render();
      this.chartRecord.push(this.data[0]);
      // here add logic of request
      // localStorage.setItem("dataCount", );
      if(this.chartRecord.length==data[0]['count']){
        this.hubConnection.stop();
        this._toast.success("Energy consumption data successfully Added.");
        this.apiService.servicePost('AfterMappingStoredHourEnergies/ConsumerEngergyConsumption',this.chartRecord).then(()=>{

        })
      }
      else{
      this.timeout = setTimeout(this.addTransferChartDataListener, 12000);
      }


  }
  checkRole(){
    let role = this.appService.getRole();
    if(role==null){
     this.isAdmin=false;
    }
    if(role=="Client" ){
     this.isAdmin=false;
    }
    if(role=="Admin" ){
     this.isAdmin=true;
    }

 }
}
