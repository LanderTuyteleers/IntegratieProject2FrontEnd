import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements AfterViewInit {
  @ViewChild('gameArea') elementView;

  constructor() {
  }

  ngAfterViewInit() {
  }

}
