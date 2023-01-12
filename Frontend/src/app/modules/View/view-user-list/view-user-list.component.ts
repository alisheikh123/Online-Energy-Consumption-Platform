import { ApiService } from '@/shared/services/api.service';
import { AppService } from '@/shared/services/app.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { checkScrollReset } from '@syncfusion/ej2-angular-grids';
import { DataTableDirective } from 'angular-datatables';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.scss']
})
export class ViewUserListComponent implements OnDestroy,OnInit {
  @ViewChild(DataTableDirective, {static: false})
  users: any[] = [];
  isAdmin:boolean=false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiService:ApiService,private routes:Router,private appService:AppService,private toast:ToastrService) { }

  ngOnInit(): void {

    this.getUsers();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.checkRole()
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
  getUsers(){
    this.apiService.serviceGet("accounts/GetUsers").then((res)=>{
      this.users = res?.data;
      this.dtTrigger.next(this.users);
    })
  }
  onEdit(id:any){
    this.routes.navigateByUrl('/add-new-user/'+id);

  }
  onDeleted(id:any){
    if(id!=null){
      this.apiService.serviceDelete(`accounts/Delete/${id}`).then((response:any)=>{
        this.toast.success("Record successfully deleted")
        window.location.reload();
      })
    }

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
