import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../api.config';
import { map, Observable, tap } from 'rxjs';
import { SessionService } from './session.service';
import { AuthResponse, LoginRequest, SignupRequest } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionService) { }
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

  private storeSessionData(res: AuthResponse, rememberMe: boolean) {
    this.sessionService.setUser({
      id: res.user.user_metadata.sub,
      name: res.user.user_metadata.name,
      email: res.user.user_metadata.email,
      department: res.user.user_metadata.department,
    });
    document.cookie = `access_token=${res.access_token}; path=/;`;
    if (rememberMe) {
      document.cookie = `refresh_token=${res.refresh_token}; path=/; max-age=${API.ONE_MONTH};`;
    }
  }

}
