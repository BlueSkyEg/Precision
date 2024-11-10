import {
  Injectable,
  Inject,
  PLATFORM_ID,
  Component,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ILoginData } from 'app/shared/interfaces/auth/login-form.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value as ILoginData;
      this._AuthService.Login(loginData).subscribe({
        next: (res) => {
          if (res.succeeded) {
            if (isPlatformBrowser(this.platformId)) {
              if (this.loginForm.value.rememberMe) {
                localStorage.setItem('savedEmail', loginData.email!);
              } else {
                localStorage.removeItem('savedEmail');
              }
            }
          }
          const role = res.data?.accessRole;
          if (role === 'admin' || role === '') {
            this._Router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loginForm.reset();
        },
      });
    }
  }
}
