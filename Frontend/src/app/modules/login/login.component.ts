import { AuthResponseDto } from '@/Interface/response/registration-response-dto';
import { UserForAuthenticationDto } from '@/Interface/user/user-for-registration-dto';
import { AppService } from '@/shared/services/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    errorMessage: string = '';
    showError: boolean;
    private returnUrl: string;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new FormGroup({
          username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    validateControl = (controlName: string) => {
      return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
    }
    hasError = (controlName: string, errorName: string) => {
      return this.loginForm.get(controlName).hasError(errorName)
    }

    loginUser = (loginFormValue) => {
      this.showError = false;
      const login = {... loginFormValue };

      const userForAuth: UserForAuthenticationDto = {
        email: login.username,
        password: login.password
      }

      this.appService.loginUser('accounts/login', userForAuth)
      .subscribe({
        next: (res:any) => {

         localStorage.setItem("token", res?.data.token);
         localStorage.setItem("userId", res?.data.userId);
         localStorage.setItem("roleName", res?.data.roleName);
         localStorage.setItem("isUserAuthenticated", res?.data.isAuthSuccessful);
         localStorage.setItem("userName", res?.data.userName);
         this.appService.sendAuthStateChangeNotification(res?.data?.isAuthSuccessful);
         this.router.navigateByUrl('main');
         window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }})
    }
}

