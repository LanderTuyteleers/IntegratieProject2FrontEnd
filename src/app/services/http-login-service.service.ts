import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import {LoginUser} from "../model/loginUser";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {RegisterUser} from "../model/RegisterUser";
import {TOKEN_NAME} from "./auth.constant";


//const httpOptions = {headers: new HttpHeaders()};
const headers = new Headers();


@Injectable()
export class HttpLoginServiceService {
  private baseURL = '/api/public';
  private port = 8080;
  private localUrl = 'http://localhost:';
  private springURL = this.localUrl + this.port + this.baseURL;
  private _error;
  private _registrationComplete = false;
  private _loginComplete = true;

  constructor(private http: Http) { }


  doLogin(loginUser: LoginUser) {
    //headers.append('Authorization', 'Bearer ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
    const url = this.springURL + '/login';
    console.log(url, loginUser.username, loginUser.password);
    return this.http.post(url, loginUser, {headers}).subscribe(
      (data) => this._loginComplete = true,
      (err) => localStorage.setItem(TOKEN_NAME, err.text)
    );
  }

  doRegister(registerUser: RegisterUser) {
    const url = this.springURL + '/register';
    console.log(registerUser.birthday, registerUser.firstName, registerUser.gender);
    return this.http.post(url, registerUser, {headers}).subscribe(
      (data) => this._registrationComplete = true,
      (err) => this._error = err.error
    );
  }


  get error() {
    return this._error;
  }


  get registrationComplete(): boolean {
    return this._registrationComplete;
  }

  get loginComplete(): boolean {
    return this._loginComplete;
  }
}
