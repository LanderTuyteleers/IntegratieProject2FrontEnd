import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lobby-item-user',
  templateUrl: './lobby-item-user.component.html',
  styleUrls: ['./lobby-item-user.component.css']
})
export class LobbyItemUserComponent implements OnInit {
  @Input() public username = '';
  constructor() {
  }

  ngOnInit() {
  }

}
