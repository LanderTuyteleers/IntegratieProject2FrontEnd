import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css',]
})
export class CardComponent implements OnInit {

  @Input() theme;
  changing:boolean = false;
  @Output() public myEvent = new EventEmitter<any>();

  constructor(private _http: Http) { }

  ngOnInit() {
  }

  changingCard() {
    this.changing = true;
  }

  stopChangingCard() {
    this.changing = false;
  }

  deleteTheme() {
    let url = "http://localhost:9090/api/public/theme?name="+ this.theme.name;
    let deletedTheme = this.theme;
    this._http.delete(url).subscribe(theme => deletedTheme = theme.json());
    this.myEvent.emit(deletedTheme);
  }

}
