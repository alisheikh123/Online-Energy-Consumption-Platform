import { ApiService } from '@/shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-energy-consuption-hours',
  templateUrl: './add-energy-consuption-hours.component.html',
  styleUrls: ['./add-energy-consuption-hours.component.scss']
})
export class AddEnergyConsuptionHoursComponent implements OnInit {
  users:any;
  devices:any;
  hourEnergyForm!:FormGroup
  constructor(private apiService:ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getIntializedForm();
    this.getUserName();
    this.getDeviceName();
  }
  getIntializedForm(){
    this.hourEnergyForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      deviceId: new FormControl('',  Validators.required),
      Hours: new FormControl('',  Validators.required),
      EnergyConsumption: new FormControl('',  Validators.required)
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
  this.hourEnergyForm.patchValue({
    userId:event.target.value
  })
}
selectDeviceId(event:any){
  this.hourEnergyForm.patchValue({
    deviceId:event.target.value
  })
}
onSave(){
  console.log(this.hourEnergyForm)

  if(this.hourEnergyForm.valid){
    this.apiService.servicePost("AfterMappingStoredHourEnergies",this.hourEnergyForm.value).then((res:any)=>{
      if(res !=null){
      this.toastr.success("Hours and Energy Successfully Assigned");
      this.hourEnergyForm.reset();
      window.location.reload();
      }
      else{
        this.toastr.warning("Something wrong in form");
      }
    });
  }
}
}
