import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameSession} from "../../model/GameSession";
import {AppDataService} from "../../services/app-data.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-create-game-session',
  templateUrl: './create-game-session.component.html',
  styleUrls: ['./create-game-session.component.css']
})
export class CreateGameSessionComponent implements OnInit {

  @Input() public _user$: User;
  gameSession: GameSession = new GameSession('', '', true, true, 3, 3, 84600, '');
  private http: AppDataService;
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  sessionCreated: Boolean = false;
  createdSessionId;
  errorMessage: String = "";

  validForm: boolean;

  constructor(http: AppDataService) {
    this.http = http;
  }

  form = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.maxLength(19), Validators.minLength(4)]),
    'isOrganisatorPlaying': new FormControl('', [Validators.required]),
    'allowUsersToAdd': new FormControl('', [Validators.required]),
    'limit': new FormControl('', [Validators.required, Validators.min(1)]),
    'selectionLimit': new FormControl('', [Validators.required, Validators.min(1)]),
    'timer': new FormControl('', [Validators.required, Validators.min(1)])
  });

  ngOnInit() {
  }

  reset(){
    this.errorMessage = "";
  }

  get title() {
    return this.form.get('title');
  }

  get isOrganiserPlaying() {
    return this.form.get('isOrganiserPlaying');
  }

  get allowUsersToAdd() {
    return this.form.get('allowUsersToAdd');
  }

  get limit() {
    return this.form.get('limit');
  }

  get selectionLimit() {
    return this.form.get('selectionLimit');
  }

  get timer() {
    return this.form.get('timer');
  }

  sendPage(page){
    this.pageChanged.emit(page);
  }

  onSubmitClicked(){
    this.gameSession.organisator = this._user$.username;
    if(this.gameSession.title.length < 1){
      this.gameSession.title = "default";
    }


      this.http.createGameSession(this.gameSession).subscribe(
        //(data) => this.sendPage("session"),
        (data) => {
          this.sessionCreated = true;
          this.createdSessionId = data;
        },
        (error) => console.log(error.status)
      );
  }



}
