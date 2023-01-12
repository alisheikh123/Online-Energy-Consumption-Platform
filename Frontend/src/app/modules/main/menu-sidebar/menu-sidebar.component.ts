import { AppService } from '@/shared/services/app.service';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public isAdmin:any;
    public userName:any;
    public menu = MENU;
    public isUserAuthenticated: boolean;
    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {

        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });

        this.user = this.appService.user;
        this.getUserName();
        this.getRoleName();
    }
    getRoleName(){
     this.isAdmin = this.appService.getRole();
    }
    getUserName(){
     this.userName=  this.appService.getUserName();
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
      name: 'New User',
      iconClasses: '',
      path: ['/add-new-user/0']
    },
    {
      name: 'New Device',
      iconClasses: '',
      path: ['/add-new-device/0']
    },

    {
      name: 'Assign Devices',
      iconClasses: '',
      path: ['/assign-role']
    },

    {
      name: 'Add Hours and Energy',
      iconClasses: '',
      path: ['/add-hours-energy']
    },
    {
      name: 'View Users',
      iconClasses: '',
      path: ['/view-user-list']
    },
    {
      name: 'View Devices',
      iconClasses: '',
      path: ['/view-device-list']
    },


];
