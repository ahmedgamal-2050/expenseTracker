import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../common/constants/endpoints.constants';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(data: { email: string; password: string }): Observable<LoginResponse> {
    const url = Endpoints.auth.login;
    return this.http.get<LoginResponse>(url);
  }
}
