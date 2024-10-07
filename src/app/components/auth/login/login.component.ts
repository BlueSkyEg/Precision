import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCheckbox } from '@angular/material/checkbox';
import { EmailOrPhoneValidator, PasswordValidator } from 'app/core/validators';
import { ErrorComponent } from 'app/shared/components/form/error/error.component';
import { merge } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ILoginData } from 'app/shared/interfaces/auth/login-form.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCheckbox,
    ReactiveFormsModule,
    ErrorComponent
],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hide = signal(true);
  constructor() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    const savedEmail = localStorage.getItem('savedEmail');

    if (emailControl) {
      merge(emailControl.statusChanges, emailControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateEmailErrorMessage());
    }

    if (passwordControl) {
      merge(passwordControl.statusChanges, passwordControl.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updatePasswordErrorMessage());
    }
    if (savedEmail) {
      this.loginForm.get('email')?.setValue(savedEmail);
      this.loginForm.get('rememberMe')?.setValue(true);
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, EmailOrPhoneValidator()]],
    password: ['', [Validators.required, PasswordValidator()]],
    rememberMe: [false],
  });

  updateEmailErrorMessage() {
    const emailControl = this.loginForm.get('email');
    this.emailErrorMessage.set('');

    if (emailControl?.touched) {
      if (emailControl?.hasError('required')) {
        this.emailErrorMessage.set(
          'You must enter a value for email or phone number.'
        );
      } else if (emailControl?.hasError('pattern')) {
        this.emailErrorMessage.set(emailControl.errors?.['pattern']);
      }
    }
  }

  updatePasswordErrorMessage() {
    const passwordControl = this.loginForm.get('password');
    this.passwordErrorMessage.set('');

    if (passwordControl?.touched) {
      if (passwordControl?.hasError('required')) {
        this.passwordErrorMessage.set('You must enter a value for password.');
      } else if (passwordControl?.hasError('pattern')) {
        this.passwordErrorMessage.set(passwordControl.errors?.['pattern']);
      }
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value as ILoginData;
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem('savedEmail', loginData.email);
    } else {
      localStorage.removeItem('savedEmail');
    }

      this._AuthService.Login(loginData).subscribe({
        next: (res) => {
          if (!res.succeeded)
            this.snackBar.open(res.message, 'X', { duration: 3000 });
          else {
            this.snackBar.open('Logged in successfully!', 'X', {
              duration: 3000,
            });
            const role = res.data?.accessRole;
            if (role == 'admin' || role == '') {
              this._Router.navigate(['/dashboard']);
            }
          }
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'X', { duration: 3000 });
        },
        complete: () => {
          this.loginForm.reset();
        },
      });
    }
  }
}
