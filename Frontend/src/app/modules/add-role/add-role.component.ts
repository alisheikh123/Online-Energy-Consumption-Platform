import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {


  constructor(private fb:FormBuilder) { }
  roleForm = this.fb.group({
    roleName: ['', [Validators.required]],
  });
  ngOnInit(): void {
  }
  onSubmit(){

  }
}
