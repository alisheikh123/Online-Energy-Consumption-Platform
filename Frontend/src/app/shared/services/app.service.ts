import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { ApiService } from './api.service';
import { UserForAuthenticationDto, UserForRegistrationDto } from '@/Interface/user/user-for-registration-dto';
import { AuthResponseDto, RegistrationResponseDto } from '@/Interface/response/registration-response-dto';
import {environment} from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    private authChangeSub = new Subject<boolean>()
    public authChanged = this.authChangeSub.asObservable();
    constructor(private router: Router, private toastr: ToastrService,
      private apiservice:ApiService,
      private http: HttpClient) {}

    //  loginByAuth(authObject:any) {
    //     try {
    //         const token:any =  Gatekeeper.loginByAuth(authObject.email, authObject.password);
    //         localStorage.setItem('token', token);
    //          this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }
    public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
      this.authChangeSub.next(isAuthenticated);
    }
    getRole(){
      let role  = localStorage.getItem('roleName');
      return role;
    }
    getUserName(){
      let userName  = localStorage.getItem('userName');
      return userName;
    }

    async getProfile() {
        try {
            this.user = ""
            // await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }
    public registerUser = (route: string, body: UserForRegistrationDto) => {

      return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, environment.API_URL_PREFIX), body);
    }
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
    public loginUser = (route: string, body: UserForAuthenticationDto) => {

      return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, environment.API_URL_PREFIX), body);
    }


    public logout = () => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
}
