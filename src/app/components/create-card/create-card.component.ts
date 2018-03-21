import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameSession} from '../../model/GameSession';
import {User} from '../../model/User';
import {AppDataService} from '../../services/app-data.service';
import {MainThema} from '../../model/MainThema';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  @Input() public _user$: User;
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();

  gameSession: GameSession = new GameSession('', '', true, true, 3, 3, 84600, '', '');
  http: AppDataService;
  sessionCreated: Boolean = false;
  createdSessionId;
  errorMessage: String = "";
  validForm: boolean;
  currentlyActive = "theme";

  //Contains the image data for a new main theme
  imageFormData: FormData;
  isNewTheme: boolean;
  mainTheme: MainThema;

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
    this.gameSession.themeForSession = this.mainTheme;
    this.gameSession.themeForSession.subThemes.forEach(subTheme =>{
      subTheme.theme = null;
    });


    console.log(this.gameSession);

    if(this.gameSession.title.length < 1){
      this.gameSession.title = "default";
    }

    this.gameSession.setSubOrganisators([]);

    this.http.createGameSession(this.gameSession).subscribe(
      //(data) => this.sendPage("session"),
      (data) => {
        console.log(data);
        this.sessionCreated = true;
        this.createdSessionId = data;
        this.loadComponenent("picture");
      },
      (error) => console.log(error.status)
    );
  }

  onSkipPressed(){
    this.sendPage("session");
  }

  onImageDataReceived(imageFormData){
    // this.imageFormData = imageFormData;
    // console.log("Image form data: " + this.imageFormData);
  }

  loadComponenent(next){
    this.currentlyActive = next;
  }

  onIsANewThemeReceived(isNewTheme){
    this.isNewTheme = isNewTheme;
  }

  onMainThemeDetailsReceived(mainTheme){
    this.mainTheme = mainTheme;
    console.log(this.mainTheme);
  }

}
