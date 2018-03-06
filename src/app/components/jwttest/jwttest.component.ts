import { Component, OnInit } from '@angular/core';
import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'app-jwttest',
  templateUrl: './jwttest.component.html',
  styleUrls: ['./jwttest.component.css']
})
export class JwttestComponent implements OnInit {

  private http: AuthHttp;
  public result: String;
  private springURL = "https://angularkandoe.herokuapp.com/api/private/users/username/sveneman";

  constructor(http: AuthHttp) {
    this.http = http;
  }

  ngOnInit() {

  }

   sendHttp(){
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJLYW5kb2UiLCJzdWIiOiJzdmVuZW1hbiIsImF1ZCI6IndlYiIsImlhdCI6MTUxOTM3OTMzOSwiZXhwIjoxNTE5MzgyOTM5fQ.NNteFPfLK97K4XuzBhi5zOOEiM8ukQ1a7hcHM1YZmdpQN3jHzsXSa7OGnv-P_bZZz4c3E6t99zme4F_iSEGyzw";
    this.http.get(this.springURL).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log('Request Complete')
    );
  }

}
