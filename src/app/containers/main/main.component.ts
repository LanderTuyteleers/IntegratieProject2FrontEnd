import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {UserService} from "../../services/user.service";
import {AppDataService} from "../../services/app-data.service";
import {USERNAME} from "../../services/auth.constant";
import {User} from "../../model/User";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  private router: Router;
  private service: HttpLoginServiceService;
  session = true;
  profile = false;
  profileImageUpload = false;
  user$: User;
  page: string = 'session';
  activeSessionsNumber: 0;

  constructor(router: Router, service: HttpLoginServiceService, private userService: UserService, private appDataService: AppDataService) {
    this.router = router;
    this.service = service;
  }

  ngOnInit() {
    this.user$ = new User();
    this.appDataService.getUser(sessionStorage.getItem(USERNAME)).subscribe(data => {
      this.user$ = data;
    });
  }

  sessionClick(){
    this.session = true;
    this.profileImageUpload = false;
    this.profile = false;
    this.page = 'session';
  }

  profileClick(){
    this.profile = true;
    this.session = false;
    this.profileImageUpload = false;
    this.page = 'profile';

  }

  profileImageUploadClick(){
    this.profileImageUpload = true;
    this.session = false;
    this.profile = false;
    this.page = 'imageUpload';
  }

  onPageChanged(newPage){
    this.page = newPage;
  }

  onUserChanged(user){
    this.user$ = user;
  }

  updateActiveSessions(number){
    this.activeSessionsNumber = number;
}
}
