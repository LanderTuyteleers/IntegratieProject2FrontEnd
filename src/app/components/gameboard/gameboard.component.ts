import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Http} from "@angular/http";
import {UserItem} from "../../model/UserItem";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TOKEN_NAME} from "../../services/auth.constant";
import {User} from "../../model/User";
import {AppDataService} from "../../services/app-data.service";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() sessionId:number;
  players: UserItem[];

  @ViewChild('gameBoard') elementView: ElementRef;
  @ViewChild('outer') elementOuter: ElementRef;

  Colors = ["#FF0000", "#00FF00", "#FF00FF", "#FFFF00","#00FFFF", "#FFFFFF"];
  screen_height: number;
  screen_width: number;
  radius: number;

  constructor(private _http: HttpClient, private appDataService: AppDataService) { }

  ngOnInit() {
    this.appDataService.getUsersFromSession(1/*this.sessionId*/).subscribe(
      (data) => {
        this.players = data;
        console.log(this.players);
        this.getProfilePicturesOfUsers();
      },
      (error) => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.screen_height = this.elementView.nativeElement.offsetHeight;
    this.screen_width = this.elementView.nativeElement.offsetWidth;
    this.radius = this.elementOuter.nativeElement.offsetHeight/2;
  }


  getProfilePicturesOfUsers(){
    for(let i = 0; i < this.players.length; i++){
      let username = this.players[i].getUsername();
      this.appDataService.getProfilePictureOfUser(username).subscribe(
        (data) => {
          this.players[i].setProfilePicture(data);
        }
      );
    }
  }

  sinus(number) {
    return Math.sin(number * Math.PI);
  }

  cosinus(number) {
    return Math.cos(number * Math.PI);
  }

}
