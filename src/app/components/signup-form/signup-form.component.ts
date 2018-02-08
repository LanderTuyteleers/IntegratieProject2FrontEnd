import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {RegisterUser} from "../../model/RegisterUser";

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  private service: HttpLoginServiceService;
  registerUser: RegisterUser = new RegisterUser('','','','','','','');
  private label;

  constructor(service: HttpLoginServiceService){
    this.service = service;
  }

  form = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'firstName': new FormControl('', [Validators.required, Validators.minLength(1)]),
    'lastName': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'birthday': new FormControl('', [Validators.required]),
    'gender': new FormControl('', [Validators.required])
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get gender() {
    return this.form.get('gender');
  }

  clickRegister(){
    this.service.doRegister(this.registerUser);
    this.label = this.service.error;
  }
}
