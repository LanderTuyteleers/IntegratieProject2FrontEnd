import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private router: Router;
  private service: HttpLoginServiceService;
  session = true;

  constructor(router: Router, service: HttpLoginServiceService, private userService: UserService) {
    this.router = router;
    this.service = service;
/*    if (!this.service.loginComplete){
      router.navigateByUrl('login');
    }*/
  }

  sessionClick(){
    this.session = true;
  }

  profileClick(){
    this.session = false;
  }
}
