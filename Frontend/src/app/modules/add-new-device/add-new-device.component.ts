import { ApiService } from '@/shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent implements OnInit {
  deviceForm!: FormGroup;
  title:string;
  btnTitle:string;
  public id:any;
  constructor( private apiService: ApiService,private router: Router,private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    ) { }
  ngOnInit(): void {

    this.getInitialized();
    this.getActiveRoutes();
  }
  getActiveRoutes(){
    this.activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
      this.apiService.serviceGet(`DeviceTbls/${this.id}`).then((response:any)=>{
     
        this.deviceForm.controls['id'].setValue(response?.id);
        this.deviceForm.controls['description'].setValue(response?.description);
        this.deviceForm.controls['address'].setValue(response?.address);
        this.deviceForm.controls['maxHEC'].setValue(response?.maxHEC);
        this.deviceForm.controls['creationDate'].setValue(response?.creationDate);
        this.deviceForm.controls['updateDate'].setValue(response?.updateDate);
      })

      this.title = this.id==0 ? "Add New Device":"Update Device";
      this.btnTitle = this.id==0?"Create":"Update";
    });
  }
  getInitialized() {
    this.deviceForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl('', Validators.required),
      maxHEC: new FormControl('', Validators.required),
      creationDate: new FormControl(''),
      updateDate: new FormControl(''),
    });

}

saveDevices() {
  try {
    if (this.deviceForm.valid) {
      if(this.id!="0"){
        this.deviceForm.patchValue({
          id:this.id=="0"?"":this.id
        })
        this.deviceForm.patchValue({
          updateDate:Date()
        })
          this.apiService.servicePost('DeviceTbls/updateDevice',this.deviceForm.value).then((response:any)=>{


              this.toastr.success("device is updated successfully!");

              this.deviceForm.reset()
              this.router.navigateByUrl('/view-device-list');


          })
      }
      else{
        this.deviceForm.patchValue({
          creationDate :new Date()
        })
        // Insert
        this.apiService.servicePost('DeviceTbls', this.deviceForm.value).then((res: any) => {
            this.toastr.success('Device successfully Created');
            this.deviceForm.reset();
          }
        );
      }


  }
}catch (error) {
    this.toastr.error(error);
  }
}
}
