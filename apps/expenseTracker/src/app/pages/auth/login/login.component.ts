import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponse } from './login.model';
import { AppStorage } from '../../../common/constants/app-storage.constants';
import { AppNavigation } from '../../../common/constants/app-navigation.constants';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastComponent } from '../../../common/components/toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  isLoading = signal(false);
  toast = signal<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  });

  loginForm = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  );

  onSubmit() {
    if (this.loginForm().invalid) {
      this.loginForm().markAllAsTouched();
      this.toast.set({
        type: 'error',
        message: this.translate.instant(
          'login_screen_please_fix_highlighted_fields'
        ),
      });
      return;
    }

    this.successLogin();
  }

  successLogin() {
    this.isLoading.set(true);
    this.authService.login(this.loginForm().value).subscribe({
      next: (res: LoginResponse) => {
        this.handleSuccessLogin(res);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.set({
          type: 'error',
          message: this.translate.instant('login_screen_login_failed'),
        });
      },
    });
  }

  handleSuccessLogin(res: LoginResponse) {
    localStorage.setItem(AppStorage.token, res.token);
    localStorage.setItem(AppStorage.user, JSON.stringify(res.user));
    this.router.navigate([AppNavigation.dashboard, AppNavigation.home]);
    this.isLoading.set(false);
    this.toast.set({
      type: 'success',
      message: this.translate.instant('login_screen_welcome_back'),
    });
  }
}
