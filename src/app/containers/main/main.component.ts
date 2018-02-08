import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private router: Router;
  private service: HttpLoginServiceService;

  constructor(router: Router, service: HttpLoginServiceService) {
    this.router = router;
    this.service = service;
    if (!this.service.loginComplete){
      router.navigateByUrl('login');
    }
  }
}
