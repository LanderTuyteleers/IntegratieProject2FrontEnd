import {Component, OnInit} from '@angular/core';
import {Card} from '../../model/Card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  jup: Card;
  stella: Card;
  maes: Card;
  beers: Array<Card>;

  constructor() {
  }

  ngOnInit() {
    this.jup = new Card('Jupiler', 'https://jupiler.be/media/img/campaigns/facepainter/allinred-logo.png');
    this.stella = new Card('Stella Artois', 'https://seeklogo.com/images/S/Stella_Artois-logo-2B093ACD7A-seeklogo.com.png');
    this.maes = new Card('Maes', 'http://bier.blog.nl/files/2012/05/logo-maes.png');

    this.beers = [this.jup, this.stella, this.maes];
  }

}
