import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {UserService} from "../../services/user.service";
import {AppDataService} from "../../services/app-data.service";
import {USERNAME} from "../../services/auth.constant";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  private router: Router;
  private service: HttpLoginServiceService;
  session = true;
  user$;

  constructor(router: Router, service: HttpLoginServiceService, private userService: UserService, private appDataService: AppDataService) {
    this.router = router;
    this.service = service;
  }

  ngOnInit() {
    this.user$ = this.appDataService.getUser(USERNAME);
  }

  sessionClick(){
    this.session = true;
  }

  profileClick(){
    this.session = false;
  }
}
