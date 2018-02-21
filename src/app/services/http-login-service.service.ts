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
  private localUrl = 'http://localhost:8080';
  private springURL = this.localUrl + this.baseURL;
  private _error;
  private _registrationComplete = false;

  constructor(private http: Http) { }

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


  set registrationComplete(value: boolean) {
    this._registrationComplete = value;
  }
}
