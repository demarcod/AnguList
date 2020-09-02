import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from './RegisterResponse'; // Or wherever it is..
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {


domain = "http://localhost:8080";

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

}
