import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupDTO } from '../model/auth.model';
import { API } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(signUpDTO: SignupDTO) {
    const headers = new HttpHeaders({
      'apikey': API.PUBLISHER_KEY,
      'Content-Type': 'application/json'
    });
    console.log(signUpDTO)
    return this.http.post(API.BASE + API.SIGNUP, signUpDTO, { headers });
  }

}
