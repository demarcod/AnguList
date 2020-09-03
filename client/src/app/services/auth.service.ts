import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from './RegisterResponse';
import { LoginResponse } from './LoginResponse';
import { ProfileResponse } from './ProfileResponse';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {


  domain = "http://localhost:8080";
  authToken;
  user;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.post<RegisterResponse>(this.domain + '/authentication/register', user, {headers:headers});
  }

  checkUsername(username) {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.get<RegisterResponse>(this.domain + '/authentication/checkUsername/' + username, {headers:headers});
  }

  checkEmail(email) {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.get<RegisterResponse>(this.domain + '/authentication/checkEmail/' + email, {headers:headers});
  }

  login(user) {
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');
    console.log(user);
    return this.http.post<LoginResponse>(this.domain + '/authentication/login', user, {headers:headers});
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.authToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authToken
    });
    console.log();
    return this.http.get<ProfileResponse>(this.domain + '/authentication/profile', {headers:headers});
  }

}
