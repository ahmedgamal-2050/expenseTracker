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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  loginForm = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  );

  onSubmit() {
    if (this.loginForm().invalid) {
      this.loginForm().markAllAsTouched();
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
      },
    });
  }

  handleSuccessLogin(res: LoginResponse) {
    localStorage.setItem(AppStorage.token, res.token);
    localStorage.setItem(AppStorage.user, JSON.stringify(res.user));
    this.router.navigate([AppNavigation.dashboard, AppNavigation.home]);
    this.isLoading.set(false);
  }
}
