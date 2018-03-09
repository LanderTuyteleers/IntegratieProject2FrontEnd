import {Component, OnInit} from '@angular/core';
import {LoginUser} from '../../model/loginUser';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.css']
})
export class LobbyListComponent implements OnInit {
  users: Array<LoginUser>;
  bob: LoginUser;
  plop: LoginUser;
  mindy: LoginUser;

  constructor() {
  }

  ngOnInit() {
    this.bob = new LoginUser('bob', '123');
    this.plop = new LoginUser('plop', '456');
    this.mindy = new LoginUser('mindy', '789');

    this.users = [this.bob, this.plop, this.mindy];
  }

}
