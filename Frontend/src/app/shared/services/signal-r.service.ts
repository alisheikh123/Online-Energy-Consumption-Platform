import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { ChartModel } from '@/Interface/response/ChartModel';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
public data :ChartModel[];
private hubConnection:signalR.HubConnection;

public startConnection = () =>{
  this.hubConnection = new signalR.HubConnectionBuilder().withUrl(environment.API2_URL_PREFIX+'chart').build();
  this.hubConnection.start().then(()=>console.log('Connection Started')).catch(err=>console.log('Error while starting connection:'+err))

}
addTransferChartDataListener(){
    this.hubConnection.on('transferchartdata',(data:any)=>{

      if(data.length==0){
        // console.log(data);
      }else{
        this.data = data;
         console.log(data);
      }
    });
  }
}
