import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Http} from "@angular/http";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {LoginUser} from "../../model/loginUser";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  private service: HttpLoginServiceService;
  loginUser = new LoginUser('','');
  private router: Router;
  private error = '';

  constructor(service: HttpLoginServiceService, router: Router, private userService: UserService, private authService: AuthService) {
    this.service = service;
    this.router = router;
  }

  form = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'password': new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.userService.logout();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  clickLogin(){
/*    this.service.doLogin(this.loginUser);
    if (this.service.loginComplete){
      this.router.navigateByUrl('main');
    }*/

    this.authService.login(this.loginUser.username, this.loginUser.password)
      .subscribe(
        res => {
          if (res) {
            this.userService.login(res);
            this.router.navigateByUrl('main');
          } else {
            this.error = 'Username or password incorrect!';
          }
        },
        err => {
          this.error = 'Username or password incorrect!';
        }
      )
  }

}
