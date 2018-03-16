import {Component, Input, OnInit} from '@angular/core';
import {UserItem} from "../../model/UserItem";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  @Input() player: UserItem;

  constructor() { }

  ngOnInit() {
  }

}
