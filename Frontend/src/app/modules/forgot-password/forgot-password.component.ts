import { AppService } from '@/shared/services/app.service';
import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: UntypedFormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required)
        });
    }

    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
        } else {
            this.toastr.error('Hello world!', 'Toastr fun!');
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
