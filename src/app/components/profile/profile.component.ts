import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  form = new FormGroup({
    'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'lastName': new FormControl('', [Validators.required]),
    'username': new FormControl(),
    'email': new FormControl()
  });

  constructor() { }


}
