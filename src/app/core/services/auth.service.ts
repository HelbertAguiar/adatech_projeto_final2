import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '@models/auth.model';
import { apiconsumo } from '../../../../environments/environments';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseURL = `${apiconsumo.baseURL}/auth`;
  // Signal that represents if user is authenticated
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.baseURL}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.isLoggedIn.set(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}
