import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../api.config';
import { map, Observable, tap } from 'rxjs';
import { SessionService } from './session.service';
import { AuthResponse, LoginRequest, SignupRequest } from '../model/auth.model';
import { CookieService } from '../../../core/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionService, private cookieService: CookieService) { }
  headers = new HttpHeaders({
    'apikey': API.PUBLISHER_KEY,
    'Content-Type': 'application/json'
  });


  signup(signUpDTO: SignupRequest) {
    return this.http.post<AuthResponse>(API.BASE + API.SIGNUP, signUpDTO, { headers: this.headers })
      .pipe(
        tap((res: AuthResponse) => {
          this.storeSessionData(res, true);
        })
      );
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<AuthResponse>(API.BASE + API.LOGIN, loginRequest, { headers: this.headers })
      .pipe(
        tap((res: AuthResponse) => {
          this.storeSessionData(res, loginRequest.rememberMe);
        })
      );
  }


  logout() {
    this.http.post<AuthResponse>(API.BASE + API.LOGOUT, { headers: this.headers });
    this.cookieService.delete("access_token");
    this.cookieService.delete("refresh_token");
    this.sessionService.user.set(null);
  }

  refreshAccessToken() {
    const refreshToken = this.cookieService.get("refresh_token");
    return this.http.post<AuthResponse>(API.BASE + API.REFRESH_TOKEN, { refresh_token: refreshToken }, { headers: this.headers })
      .pipe(
        tap((res: AuthResponse) => {
          this.storeSessionData(res, true);
        })
      );
  }

  private storeSessionData(res: AuthResponse, rememberMe: boolean) {
    this.sessionService.setUser({
      id: res.user.user_metadata.sub,
      name: res.user.user_metadata.name,
      email: res.user.user_metadata.email,
      department: res.user.user_metadata.department,
    });
    this.cookieService.set("access_token", res.access_token);

    if (rememberMe) {
      this.cookieService.set("refresh_token", res.refresh_token, 30);
    }
  }

}
