import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from "./auth.constant";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  static AUTH_TOKEN = '/api/public/login';

  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }



}
