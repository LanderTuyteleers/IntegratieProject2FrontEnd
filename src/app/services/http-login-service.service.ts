import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginUser} from "../model/loginUser";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {RegisterUser} from "../model/RegisterUser";


const httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};

@Injectable()
export class HttpLoginServiceService {
  private baseURL = '/api';
  private port = 8080;
  private localUrl = 'http://localhost:';
  private springURL = this.localUrl + this.port + this.baseURL;
  private _error;
  constructor(private http: HttpClient) { }


  doLogin(loginUser: LoginUser) {
    const url = this.springURL + '/login';
    console.log(url, loginUser.username, loginUser.password);
    return this.http.post(url, loginUser, httpOptions).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

  doRegister(registerUser: RegisterUser) {
    const url = this.springURL + '/register';
    console.log(registerUser.birthday, registerUser.firstName, registerUser.gender);
    return this.http.post(url, registerUser, httpOptions).subscribe(
      (data) => this._error = data,
      (err) => console.log(err)
    );
  }


  get error() {
    return this._error;
  }
}
