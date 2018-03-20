import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Circle} from '@progress/kendo-drawing';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() card: Circle;
  @Input() value = 0;
  @Input() numberOfCircles = 0;
  @Output() change = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  moveCard() {
    if (this.value < this.numberOfCircles - 1) {
      this.value++;
      this.change.emit({card: this.card, value: this.value});
    }
  }
}
