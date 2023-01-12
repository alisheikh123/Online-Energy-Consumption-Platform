import { CommonFunctions } from '@/common/CommonFunction';
import { ApiService } from '@/shared/services/api.service';
import { AppService } from '@/shared/services/app.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  userRegisterForm!:FormGroup;
  public isAuthLoading = false;
  public errorMessage: string = '';
  public showError: boolean;
  public id:any;
  public role:any;
  roleSelected:any;
  title:string;
  btnTitle:string;
  constructor(private appService:AppService,
    private apiService:ApiService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.getActiveRoutes();
    this.getIntilialized();
    this.getRoleValue();
  }
  getRoleValue(){
    this.role = [
      {
        value:'1',
        text:'Admin'
      },
      {
        value:'2',
        text:'Client'
      },
    ]
  }
  getActiveRoutes(){
    this.activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
      this.apiService.serviceGet(`accounts/${this.id}`).then((response:any)=>{
        this.userRegisterForm.controls['userName'].setValue(response?.data?.userName);
        this.userRegisterForm.controls['firstName'].setValue(response?.data?.firstName);
        this.userRegisterForm.controls['lastName'].setValue(response?.data?.lastName);
        this.userRegisterForm.controls['email'].setValue(response?.data?.email);
        this.userRegisterForm.controls['roleId'].setValue(response?.data?.roleId);
        this.userRegisterForm.controls['password'].setValue(response?.data?.password);
        this.roleSelected =  response?.data?.roleId;

      })

      this.title = this.id==0?"Add New User":"Update User";
      this.btnTitle = this.id==0?"Create":"Update";
    });
  }
  getIntilialized(){
    this.userRegisterForm = new FormGroup({
      id:new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('', ),
      userName: new FormControl('', ),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
    });
  }
  changeRole(event:any){
this.userRegisterForm.patchValue({
  roleId:event.target.value
});

  }

  registerUser(){
    try {
      if (this.userRegisterForm.valid) {

        if(this.id!="0"){
          this.userRegisterForm.patchValue({
            id:this.id=="0"?"":this.id
          })
            this.appService.registerUser('accounts/registration',this.userRegisterForm.value).subscribe((response:any)=>{
           
              if(response?.statusCode == 'OK'){

                this.toastr.success(response?.message);

                this.userRegisterForm.reset()
                this.router.navigateByUrl('/view-user-list');
              }
              else{
                this.toastr.error(response?.message)

              }
            })
        }
        else{
          this.isAuthLoading = true;
           this.appService.registerUser('accounts/registration',this.userRegisterForm.value).subscribe((res:any)=>{

              if(HttpStatusCode.Created==res?.statusCode){

                this.toastr.success(res?.message)
                this.userRegisterForm.reset()
              }
              else{
                this.toastr.success(res?.message)

              }

            error: (err: HttpErrorResponse) => {


            }
          });
        }
        }
        else{
          this.toastr.error("Form is not valid");

        }
      }
        catch (error) {
          this.isAuthLoading=false;
          console.log(CommonFunctions.extractErrorMessage(error));
          this.toastr.error(CommonFunctions.extractErrorMessage(error));
        }
          this.isAuthLoading = false;
      }
  }


