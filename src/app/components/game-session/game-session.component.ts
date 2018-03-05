import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameSession} from "../../model/GameSession";
import {User} from "../../model/User";
import {AppDataService} from "../../services/app-data.service";
import {error} from "util";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {
  amountOfSessions: Number;
  gameSessions: GameSession[] = [];
  gameSessionImages: String[] = [];
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() activeSessionsChanged: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() chosenGameSessionId: EventEmitter<Number> = new EventEmitter<Number>();
  animationClass = 'is-paused';
  domSanitizerService;

  private http: AppDataService;

  constructor(http: AppDataService, private domSanitizer: DomSanitizer) {
    this.http = http;
    this.domSanitizerService = this.domSanitizer;

    let allUsers = [];
    // allUsers = this.createDummyUsers();
    //
    //
    // let gameSession = new GameSession(allUsers, allUsers[0], true, false, 3, 5, 3600, "Cool Session");
    //
    //
    // let usersSession2 = [];
    // usersSession2[0] = allUsers[0];
    // usersSession2[1] = allUsers[1];
    // usersSession2[2] = allUsers[2];
    // let gameSession2 = new GameSession(usersSession2, usersSession2[1], false, true, 4, 4, 4800, "Game Session 2");
    // let gameSession3 = new GameSession(usersSession2, usersSession2[1], false, true, 4, 4, 4800, "Game Session 3");
    // let gameSession4 = new GameSession(usersSession2, usersSession2[1], false, true, 4, 4, 4800, "Game Session 4");
    //



    // this.gameSessions[0] = gameSession;
    // this.gameSessions[1] = gameSession2;
    // this.gameSessions[2] = gameSession3;
    // this.gameSessions[3] = gameSession4;
  }

  // createDummyUsers(){
  //   let sven = new User();
  //   sven.username = "sveneman";
  //   sven.firstName= "sven";
  //   sven.lastName= "matthys";
  //   sven.email= "matthys.sven@gmail.com";
  //   sven.gender= "Male";
  //   sven.birthday = "1997-03-06";
  //
  //   let bob = new User();
  //   bob.username = "bobdb";
  //   bob.firstName= "bob";
  //   bob.lastName= "de bouwer";
  //   bob.email= "bobdb@gmail.com";
  //   bob.gender= "Male";
  //   bob.birthday = "1990-11-10";
  //
  //   let plop = new User();
  //   plop.username = "kabouterplop";
  //   plop.firstName= "plop";
  //   plop.lastName= "kabouter";
  //   plop.email= "plop@gmail.com";
  //   plop.gender= "Male";
  //   plop.birthday = "1994-09-14";
  //
  //   let mindy = new User();
  //   mindy .username = "megam";
  //   mindy .firstName= "mindy";
  //   mindy .lastName= "mega";
  //   mindy .email= "megaM@gmail.com";
  //   mindy .gender= "Female";
  //   mindy .birthday = "2005-06-09";
  //
  //   let users = [];
  //   users[0] = sven;
  //   users[1] = bob;
  //   users[2] = plop;
  //   users[3] = mindy;
  //
  //   return users;
  // }

  onAddClick(){
    this.pageChanged.emit("createGameSession");
  }

  ngOnInit() {
    this.http.getGameSessions().subscribe(
      (data) => {
        this.gameSessions = data.reverse();
        this.sendActiveEvent();
        this.getGameSessionImage();
      },
      (error) => console.log(error)
    );

  }

  getGameSessionImage(){
    for(let i = 0; i < this.gameSessions.length; i++){
      let sessionId = this.gameSessions[i].gameSessionId;
      this.http.getGameSessionImage(sessionId).subscribe(
        (data) => {
          this.gameSessionImages[i] = data;
        }
      );
    }
  }

  sendActiveEvent(){
    this.activeSessionsChanged.emit(this.gameSessions.length);
  }

  onSettingsClick(event){

    var target = event.target;
    var idAttr = target.attributes.id;
    var id = idAttr.nodeValue;
    this.pageChanged.emit("gameSessionSettings");
    this.chosenGameSessionId.emit(this.gameSessions[id].gameSessionId);
  }

  onEditClick(event){
    var target = event.target;
    var idAttr = target.attributes.id;
    var id = idAttr.nodeValue;
    this.pageChanged.emit('gameSessionEdit');
    this.chosenGameSessionId.emit(this.gameSessions[id].gameSessionId);
  }

  onPlayClick(event){

  }
}
