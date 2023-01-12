import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { AddNewDeviceComponent } from './modules/add-new-device/add-new-device.component';
import { AddNewUserComponent } from './modules/add-new-user/add-new-user.component';
import { BarchartComponent } from './modules/barchart/barchart.component';
import { AddRoleComponent } from './modules/add-role/add-role.component';
import { AssignDevicesToUserComponent } from './modules/assign-devices-to-user/assign-devices-to-user.component';
import { AddEnergyConsuptionHoursComponent } from './modules/add-energy-consuption-hours/add-energy-consuption-hours.component';
import { ViewUserListComponent } from './modules/View/view-user-list/view-user-list.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { ViewDevicesListComponent } from './modules/View/view-devices-list/view-devices-list.component';
import { DateFormatPipe } from './pip/date-format.pipe';
import { NgChartsModule } from 'ng2-charts';
import CanvasJS from 'canvasjs';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        AddNewDeviceComponent,
        AddNewUserComponent,
        BarchartComponent,
        AddRoleComponent,
        AssignDevicesToUserComponent,
        AddEnergyConsuptionHoursComponent,
        ViewUserListComponent,
        NotFoundComponent,
        ViewDevicesListComponent,
        DateFormatPipe,
        CanvasJSChart
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        DataTablesModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule ,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        NgbModule,
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: '404', component : NotFoundComponent},
          { path: '', redirectTo: '/', pathMatch: 'full' },
          { path: '**', redirectTo: '/404', pathMatch: 'full'}
      ]),
      NgChartsModule,


    ],
    exports: [

      FormsModule,
      ReactiveFormsModule
    ],

    providers: [DatePipe ,DateFormatPipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
