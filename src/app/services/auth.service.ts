import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {LoginUser} from "../model/loginUser";
import {TOKEN_NAME, USERNAME} from "./auth.constant";

@Injectable()
export class AuthService {

  static AUTH_TOKEN = 'http://localhost:8080/api/public/login';


  constructor(private http: Http) {
  }

  login(loginUser: LoginUser) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + TOKEN_NAME);
    headers.append("Content-Type", "application/json");

    localStorage.setItem(USERNAME, loginUser.username);
    return this.http.post(AuthService.AUTH_TOKEN, loginUser, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          console.log(res.access_token);
          return res.access_token;
        }
        return null;
      });
  }

}
