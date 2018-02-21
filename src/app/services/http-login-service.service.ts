import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginUser} from "../model/loginUser";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {RegisterUser} from "../model/RegisterUser";
import {TOKEN_NAME} from "./auth.constant";


const httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};

@Injectable()
export class HttpLoginServiceService {
  private baseURL = '/api/public';
  private port = 8080;
  private localUrl = 'https://kandoe.herokuapp.com';
  private springURL = this.localUrl + this.baseURL;
  private _error;
  private _registrationComplete = false;

  constructor(private http: HttpClient) { }

  doRegister(registerUser: RegisterUser) {
    const url = this.springURL + '/register';
    console.log(registerUser.birthday, registerUser.firstName, registerUser.gender);
    return this.http.post(url, registerUser, httpOptions).subscribe(
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
}
