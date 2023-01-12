import { AppService } from '@/shared/services/app.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;
    public isUserAuthenticated: any;
    constructor(private appService: AppService, private router: Router) {}

    ngOnInit(): void {
         this.user = this.appService.user;
        
        this.user =  this.appService.authChanged
         .subscribe(res => {
          this.isUserAuthenticated = res;
         })
        this.isUserAuthenticated= localStorage.getItem('isUserAuthenticated');
    }

    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
