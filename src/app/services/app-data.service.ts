import { Injectable } from '@angular/core';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class AppDataService {
  private springURL = "http://localhost:8080/api/private";

  constructor(private http: AuthHttp) { }

  getUser(username) {
    return this.http.get(this.springURL + "/users/username/"+username).map(res => res.json());
  }

}
