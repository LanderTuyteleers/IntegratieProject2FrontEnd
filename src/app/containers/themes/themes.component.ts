import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  @Input() type;
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() chosenThemeId: EventEmitter<Number> = new EventEmitter<Number>();
  currentlyActive = 'theme';
  constructor() { }

  ngOnInit() {
  }

  onChosenThemeId(event) {
    this.chosenThemeId.emit(event);
  }

  onPageChanged(event) {
    this.pageChanged.emit(event);
  }
}
