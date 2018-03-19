import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AppDataService} from '../../services/app-data.service';
import {Playingcard} from '../../model/Playingcard';

@Component({
  selector: 'app-playingcard',
  templateUrl: './playingcard.component.html',
  styleUrls: ['./playingcard.component.css']
})
export class PlayingcardComponent implements OnInit {
  playingcards: Playingcard[] = [];
  playingcardImages: string[] = [];

  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() chosenPlayingcardId: EventEmitter<Number> = new EventEmitter<Number>();
  domSanitizerService;

  http: AppDataService;

  constructor(http: AppDataService, private domSanitizer: DomSanitizer) {
    this.http = http;
    this.domSanitizerService = this.domSanitizer;

    let allUsers = [];
  }

  onAddClick(){
    this.pageChanged.emit("createCard");
  }

  ngOnInit() {
    this.playingcards.push(new Playingcard('naam','test','sveneman','Card','true','test'));
    this.getPlayingcards();
  }

  getPlayingcards(){
    this.http.getPlayingcards().subscribe(
      (data) => {
        this.playingcards = data.reverse();
        this.getPlayingcardImage();
      },
      (error) => console.log(error.status)
    );
  }

  getPlayingcardImage(){
    for(let i = 0; i < this.playingcards.length; i++){
      let sessionId = this.playingcards[i].playingcardId;
      this.http.getGameSessionImage(sessionId).subscribe(
        (data) => {
          this.playingcardImages[i] = data;
        }
      );
    }
  }

  onReviewClick(event){

    var target = event.target;
    var idAttr = target.attributes.id;
    var id = idAttr.nodeValue;
    this.pageChanged.emit("playingcardReview");
    this.chosenPlayingcardId.emit(this.playingcards[id].playingcardId);
  }

  onEditClick(event){
    var target = event.target;
    var idAttr = target.attributes.id;
    var id = idAttr.nodeValue;
    this.pageChanged.emit('playingcardEdit');
    this.chosenPlayingcardId.emit(this.playingcards[id].playingcardId);
  }

}
