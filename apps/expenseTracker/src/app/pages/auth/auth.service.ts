import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoginConstants } from './login/login.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(data: { email: string; password: string }) {
    //return this.http.post('https://localhost:3000/auth/login', data);
    return of(LoginConstants);
  }
}
