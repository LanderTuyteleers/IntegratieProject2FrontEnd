import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Http} from "@angular/http";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {LoginUser} from "../../model/loginUser";
import {Router} from "@angular/router";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  private service: HttpLoginServiceService;
  loginUser = new LoginUser('','');
  private router: Router;

  constructor(service: HttpLoginServiceService, router: Router) {
    this.service = service;
    this.router = router;
  }

  form = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'password': new FormControl('', [Validators.required])
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  clickLogin(){
    this.service.doLogin(this.loginUser);
    if (this.service.loginComplete){
      this.router.navigateByUrl('main');
    }
  }

}
