import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {UserService} from "../../services/user.service";
import {AppDataService} from "../../services/app-data.service";
import {USERNAME} from "../../services/auth.constant";
import {User} from "../../model/User";
import {DomSanitizer} from '@angular/platform-browser';

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
  chosenGameSessionId: Number;
  imageSrc = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
  domSanitizerService;

  constructor(router: Router, service: HttpLoginServiceService, private userService: UserService, private appDataService: AppDataService, private domSanitizer: DomSanitizer) {
    this.router = router;
    this.service = service;
    this.domSanitizerService = this.domSanitizer;
  }

  ngOnInit() {
    this.user$ = new User();
    this.appDataService.getUser(sessionStorage.getItem(USERNAME)).subscribe(data => {
      this.user$ = data;
    });

    this.appDataService.getProfilePicture().subscribe(
      (data) => {
        this.imageSrc = data;
      }
    );

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

  setChosenGameSessionId(id){
    this.chosenGameSessionId = id;
  }

  updateProfilePicture(newUrl){
    this.imageSrc = newUrl;
  }
}
