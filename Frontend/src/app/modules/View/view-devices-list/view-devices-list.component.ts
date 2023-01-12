import { ModalProperties } from '@/Interface/modal.config';
import { ApiService } from '@/shared/services/api.service';
import { AppService } from '@/shared/services/app.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { DataTableDirective } from 'angular-datatables';
import {  Subject } from 'rxjs';

@Component({
  selector: 'app-view-devices-list',
  templateUrl: './view-devices-list.component.html',
  styleUrls: ['./view-devices-list.component.scss']
})
export class ViewDevicesListComponent implements OnDestroy, OnInit  {
  @ViewChild(DataTableDirective, {static: false})
  devices: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isAdmin:boolean=false;

  constructor(private apiService:ApiService,private routes:Router,private appService:AppService,) { }
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  ngOnInit(): void {
    this.checkRole()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getDevices();
  }
  checkRole(){
    let role = this.appService.getRole();
    if(role=="Client" ){
     this.isAdmin=false;
    }
    else{
     this.isAdmin=true;
    }
  }
  getDevices() {
    if(this.isAdmin===true){
      this.apiService.serviceGet("DeviceTbls").then((res)=>{

        this.devices = res;
        this.dtTrigger.next(this.devices);
      })
    }
    else{
      //client
      let userId  = localStorage.getItem('userId');
      this.apiService.serviceGet(`DeviceTbls/GetDevices/${userId}`).then((res:any)=>{
       debugger
       this.devices =  res?.data;
       this.dtTrigger.next(this.devices);

     })
    }

  }


onEdit(id:any){

  this.routes.navigateByUrl('/add-new-device/'+id);

}
onDeleted(id:any){
  if(id!=null){
    this.apiService.serviceDelete(`DeviceTbls/${id}`).then((response:any)=>{
      window.location.reload();
    })
  }

}
ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}
}
