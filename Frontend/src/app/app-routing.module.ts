import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {AddNewDeviceComponent} from '@modules/add-new-device/add-new-device.component';
import {AddNewUserComponent} from '@modules/add-new-user/add-new-user.component';
import {BarchartComponent} from '@modules/barchart/barchart.component';
import { AddRoleComponent } from '@modules/add-role/add-role.component';
import { AssignDevicesToUserComponent } from '@modules/assign-devices-to-user/assign-devices-to-user.component';
import { AddEnergyConsuptionHoursComponent } from '@modules/add-energy-consuption-hours/add-energy-consuption-hours.component';
import { ViewUserListComponent } from '@modules/View/view-user-list/view-user-list.component';
import { ViewDevicesListComponent } from '@modules/View/view-devices-list/view-devices-list.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'barchart',
                component: BarchartComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'add-new-device/:id',
                component: AddNewDeviceComponent
            },
            {
                path: 'add-new-user/:id',
                component: AddNewUserComponent
            },
            {
                path: 'add-role',
                component: AddRoleComponent
            },
            {
                path: 'assign-role',
                component: AssignDevicesToUserComponent
            },
            {
                path: 'add-hours-energy',
                component: AddEnergyConsuptionHoursComponent
            },
            {
                path: 'view-user-list',
                component: ViewUserListComponent
            },
            {
                path: 'view-device-list',
                component: ViewDevicesListComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
