import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../model/Card';

@Component({
  selector: 'app-game-lane',
  templateUrl: './game-lane.component.html',
  styleUrls: ['./game-lane.component.css']
})
export class GameLaneComponent implements OnInit {
  @Input() public beer: Card;
  currentBlock: any;
  nextBlock: any;
  field: any;
  lane: any;
  blockCounter = 1;
  private smth: HTMLElement[];
  private smth2: HTMLElement;

  constructor() {
  }

  ngOnInit() {
  }

  copyContent() {
    /*this.currentBlock = document.getElementById(`block${this.blockCounter}`);
    this.blockCounter++;
    this.nextBlock = document.getElementById(`block${this.blockCounter}`);
    this.nextBlock.innerHTML = this.currentBlock.innerHTML;
    this.currentBlock.innerHTML = this.blockCounter - 1;*/
    this.field = document.getElementById(this.beer.description);
    console.log(this.field);
    console.log(this.field.childNodes);
    this.smth = this.field.childNodes[1];
    console.log(this.smth);
    // this.smth2 = this.smth[1];
    /*this.lane = this.field.firstChild;
    console.log(this.lane.getChildren());*/
  }
}
