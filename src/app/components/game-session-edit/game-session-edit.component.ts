import {Component, Input, OnInit} from '@angular/core';
import {UserItem} from "../../model/UserItem";
import {AppDataService} from "../../services/app-data.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-game-session-edit',
  templateUrl: './game-session-edit.component.html',
  styleUrls: ['./game-session-edit.component.css']
})
export class GameSessionEditComponent implements OnInit {

  @Input() public chosenGameSessionId;
  users: UserItem[] = [];
  private http;
  domSanitizerService;

  constructor(http: AppDataService, private domSanitizer: DomSanitizer) {
    this.http = http;
    this.domSanitizerService = domSanitizer;
  }

  ngOnInit() {
    this.http.getUsersFromSession(this.chosenGameSessionId).subscribe(
      (data) => {
        this.users = data;
        this.getProfilePicturesOfUsers();
      },
      (error) => console.log(error)
    );
  }

  getProfilePicturesOfUsers(){
    for(let i = 0; i < this.users.length; i++){
      let username = this.users[i].getUsername();
      this.http.getProfilePictureOfUser(username).subscribe(
        (data) => {
          console.log(data);
          this.users[i].setProfilePicture(data);
        },
        (error) => console.log(error)
      );
    }
  }

}
