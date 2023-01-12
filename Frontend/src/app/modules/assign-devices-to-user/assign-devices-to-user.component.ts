import { DateFormatPipe } from '@/pip/date-format.pipe';
import { ApiService } from '@/shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-devices-to-user',
  templateUrl: './assign-devices-to-user.component.html',
  styleUrls: ['./assign-devices-to-user.component.scss']
})
export class AssignDevicesToUserComponent implements OnInit {
  users:any;
  dateTime = new Date();
  devices:any;
  devicetouserForm!:FormGroup
  constructor(private apiService:ApiService, private toastr: ToastrService,private dateFormatPipe:DateFormatPipe) { }

  ngOnInit(): void {
    this.getIntializedForm();
    this.getUserName();
    this.getDeviceName();
  }
  getIntializedForm(){
    this.devicetouserForm = new FormGroup({
      id: new FormControl(0),
      userId: new FormControl('', Validators.required),
      deviceId: new FormControl('',  Validators.required),
      assigningDate: new FormControl('')
    });
  }
  getUserName()
  {
    this.apiService.serviceGet("accounts/GetUsers").then((response:any)=>{
      this.users = response?.data;
      console.log(this.users)
    });
  }
 getDeviceName(){
  this.apiService.serviceGet("DeviceTbls").then((res:any)=>{
    this.devices = res;
  });
}
selectUserId(event:any){
  this.devicetouserForm.patchValue({
    userId:event.target.value
  })
}
selectDeviceId(event:any){
  this.devicetouserForm.patchValue({
    deviceId:event.target.value
  })
}

onSave(){

  this.devicetouserForm.controls.assigningDate.setValue(this.devicetouserForm.controls.assigningDate.value);

  let date = this.devicetouserForm.get('assigningDate').value;
     this.devicetouserForm.patchValue({
        assigningDate:date
      })
    debugger
    if(this.devicetouserForm.valid){
    this.apiService.servicePost('UserDeviceMappingTbls',this.devicetouserForm.value).then((res:any)=>{

      this.toastr.success("Device successfully assigned to user");
      window.location.reload();

    });
  }
}
}
