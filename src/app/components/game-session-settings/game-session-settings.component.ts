import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "rxjs/Notification";
import {Notifications} from "../../model/Notifications";
import {AppDataService} from "../../services/app-data.service";

@Component({
  selector: 'app-game-session-settings',
  templateUrl: './game-session-settings.component.html',
  styleUrls: ['./game-session-settings.component.css']
})
export class GameSessionSettingsComponent implements OnInit {
  http: AppDataService;
  notifications: Notifications = new Notifications(false, false, false, false);
  @Input() chosenGameSessionId: Number;
  @Input() username: String;
  successMessage: String = "Successfully updated notification settings!";
  success: Boolean = false;

  constructor(http: AppDataService) {
    this.http = http;
  }

  ngOnInit() {
    this.http.getNotificationSettings(this.chosenGameSessionId).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => console.log(error.status)
    );
  }

  onSubmitClicked(){
      this.http.updateNotificationsForGameSession(this.username, this.chosenGameSessionId, this.notifications).subscribe(
        (data) => this.success = true,
        (error) => console.log(error.status)
      );
  }

}
