import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MainThema} from "../../model/MainThema";
import {SubTheme} from "../../model/SubTheme";
import {User} from "../../model/User";
import {CompleterData, CompleterService} from "ng2-completer";
import {AppDataService} from "../../services/app-data.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-main-theme',
  templateUrl: './create-main-theme.component.html',
  styleUrls: ['./create-main-theme.component.css']
})
export class CreateMainThemeComponent implements OnInit {
  @Input() public typeOfTheme:String;
  @Input() nextStep: String = '';
  @Input() mainTheme = new MainThema('','','', '');

  @Output()loadNext: EventEmitter<String> = new EventEmitter<String>();
  @Output() imageData: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() isANewTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mainThemeDetails: EventEmitter<MainThema> = new EventEmitter<MainThema>();

  @ViewChild('mainThemes') child;
  @ViewChild('imageUpload') imageChild;

  errorMessage;
  isMainTheme: boolean;
  // mainTheme = new MainThema('','','', '');
  subTheme = new SubTheme('','','');
  subThemes: SubTheme[] = [];
  imageSrc = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
  //Marks whether a user chose an existing theme or created a new one
  isNewTheme: boolean;
  ordinal;

  http :AppDataService;
  completerService;


  constructor(http: AppDataService, completerService: CompleterService) {
    this.completerService = completerService;
    this.http = http;
  }

  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(19), Validators.minLength(4)]),
    'description': new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if(this.typeOfTheme == 'theme'){
      this.isMainTheme = true;
    }
    else{
      this.isMainTheme = false;
    }
    this.subThemes.push(new SubTheme(this.mainTheme,'',''));
  }

  gotoNextStep(){
    this.createNewTheme();
    let validSubThemeName = false;
    let validSubThemeDesc = false;
    if(!this.isMainTheme){

      if(this.subTheme.subThemeName.length <= 0){
        this.errorMessage = "Please fill in the name of your sub theme";
      }
      else if(this.subTheme.subThemeDescription.length <= 0){
        this.errorMessage = "Please fill in the description of your sub theme";
      }
      else{
        validSubThemeName = true;
        validSubThemeDesc = true;
      }

    }

    if(this.mainTheme.name.length <= 0){
      this.errorMessage = "Please fill in the name of your theme";
    }

    else if(this.mainTheme.description.length <= 0){
      this.errorMessage = "Please fill in the description of your theme";
    }
    else{
        if(!this.isMainTheme){
          this.mainTheme.subThemes = this.subThemes;
        }
        this.sendInformation();
        this.loadNext.emit(this.nextStep);
    }
  }

  sendInformation(){
    this.mainThemeDetails.emit(this.mainTheme);
    this.isANewTheme.emit(this.isNewTheme);
  }


  addSubtheme(){
    this.subThemes.push(new SubTheme('','',''));
  }

  mainThemeChanged(activeMainTheme){
    if(activeMainTheme == null){
      this.mainTheme = new MainThema('','','','');
      this.isNewTheme = true;
      this.imageSrc = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
    }
    else{
      this.mainTheme = activeMainTheme;
      this.isNewTheme = false;
      this.imageChild.resetImageInput();
      this.imageSrc = this.mainTheme.image;
    }
  }

  onClearClick(){
    this.imageChild.reset();
    this.child.onDeselectPressed();
  }

  onImageDataReceived(imageFormData:FormData){
    // this.imageData.emit(imageFormData);
  }

  onPictureChanged(url){
    this.mainTheme.image = url;
  }

  onAddSubThemePressed(){
    //this.http.createSubTheme()?
    this.subThemes.push(new SubTheme(this.mainTheme,'',''));
  }

  ordinalValueOf(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  createNewTheme() {
    this.mainTheme.name = this.mainTheme.name;
    this.mainTheme.description = this.mainTheme.description;
    this.http.createMainTheme(this.mainTheme).subscribe(
      //(data) => this.sendPage("session"),
      (data) => {
        console.log(data);
        //this.themeCreated = true;
        //this.createdThemeId = data;
      },
      (error) => console.log(error.status)
    );
  }
}
