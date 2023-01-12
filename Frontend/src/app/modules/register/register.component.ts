import { CommonFunctions } from '@/common/CommonFunction';
import { AppService } from '@/shared/services/app.service';
import { PasswordConfirmationValidatorService } from '@/shared/services/custom-validators/password-confirmation-validator.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { Route, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    registerForm!: FormGroup;
    public isAuthLoading = false;
    public errorMessage: string = '';
    public showError: boolean;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private route:Router,
        private passConfValidator: PasswordConfirmationValidatorService,
        private appService:AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new FormGroup({
            firstName: new FormControl(null, ),
            lastName: new FormControl(null, ),
            email: new FormControl(null, Validators.email),
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required]),
            confirmPassword: new FormControl(null, )
        });
        this.registerForm.get('confirmPassword').setValidators([Validators.required,
          this.passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
    }

    async registerByAuth() {
      try {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            await this.appService.registerUser('accounts/registration',this.registerForm.value).subscribe({

              next: (_) =>{
                this.toastr.success("Successful registration")
                this.registerForm.reset()
          },
              error: (err: HttpErrorResponse) => {
                this.errorMessage = err.error.errors;
                this.showError = true;

              }
            });
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
        public validateControl = (controlName: string) => {
          return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
        }

        public hasError = (controlName: string, errorName: string) => {
          return this.registerForm.get(controlName).hasError(errorName)
        }



    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
        }
      }
