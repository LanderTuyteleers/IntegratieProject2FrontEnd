import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MainThema} from '../../model/MainThema';
import {SubTheme} from '../../model/SubTheme';
import {User} from '../../model/User';
import {CompleterData, CompleterService} from 'ng2-completer';
import {AppDataService} from '../../services/app-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-main-theme',
  templateUrl: './create-main-theme.component.html',
  styleUrls: ['./create-main-theme.component.css']
})
export class CreateMainThemeComponent implements OnInit {
  @Input() type;
  @Input() public typeOfTheme: String;
  @Input() nextStep: String = '';
  @Input() mainTheme = new MainThema('', '', [], '');

  @Output() loadNext: EventEmitter<String> = new EventEmitter<String>();
  @Output() imageData: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() isANewTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mainThemeDetails: EventEmitter<MainThema> = new EventEmitter<MainThema>();

  @ViewChild('mainThemes') child;
  @ViewChild('imageUpload') imageChild;

  errorMessage;
  isMainTheme: boolean;
  // mainTheme = new MainThema('','','', '');
  subTheme = new SubTheme('', '', '');
  subThemes: SubTheme[] = [];
  imageSrc = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';
  //Marks whether a user chose an existing theme or created a new one
  isNewTheme: boolean;

  http: AppDataService;
  completerService;
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() chosenThemeId: EventEmitter<Number> = new EventEmitter<Number>();

  constructor(http: AppDataService, completerService: CompleterService) {
    this.completerService = completerService;
    this.http = http;
  }

  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(19), Validators.minLength(4)]),
    'description': new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.typeOfTheme == 'theme') {
      this.isMainTheme = true;
    }
    else {
      this.isMainTheme = false;
    }
    this.subThemes.push(new SubTheme(this.mainTheme, '', ''));
  }

  gotoNextStep() {


    if (!this.isMainTheme) {

      this.subThemes.forEach(st => {
        if (st.subThemeName.length <= 0) {
          this.errorMessage = 'Please fill in the name of your sub theme';
        }
        else if (st.subThemeDescription.length <= 0) {
          this.errorMessage = 'Please fill in the description of your sub theme';
        } else {
          this.saveSubTheme(st);
        }
      });
      this.sendInformation();
    } else {
      if (this.mainTheme.name.length <= 0) {
        this.errorMessage = 'Please fill in the name of your theme';
      }
      else if (this.mainTheme.description.length <= 0) {
        this.errorMessage = 'Please fill in the description of your theme';
      }
      else {
        this.saveTheme();
      }

    }
    /*    let validSubThemeName = false;
        let validSubThemeDesc = false;
        if (!this.isMainTheme) {

          if (this.subTheme.subThemeName.length <= 0) {
            this.errorMessage = 'Please fill in the name of your sub theme';
          }
          else if (this.subTheme.subThemeDescription.length <= 0) {
            this.errorMessage = 'Please fill in the description of your sub theme';
          }
          else {
            this.saveSubTheme();
            validSubThemeName = true;
            validSubThemeDesc = true;
          }

        }

        else {
          if (this.mainTheme.name.length <= 0) {
            this.errorMessage = 'Please fill in the name of your theme';
          }
          else if (this.mainTheme.description.length <= 0) {
            this.errorMessage = 'Please fill in the description of your theme';
          }
          else {
            this.saveTheme();
          }
        }
        this.sendInformation();*/
  }

  sendInformation() {
    this.mainThemeDetails.emit(this.mainTheme);
    this.isANewTheme.emit(this.isNewTheme);
    this.loadNext.emit(this.nextStep);
  }


  addSubtheme() {
    this.subThemes.push(new SubTheme('', '', ''));
  }

  mainThemeChanged(activeMainTheme) {
    if (activeMainTheme == null) {
      this.mainTheme = new MainThema('', '', [], '');
      this.isNewTheme = true;
      this.imageSrc = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';
    }
    else {
      this.mainTheme = activeMainTheme;
      this.isNewTheme = false;
      this.imageChild.resetImageInput();
      this.imageSrc = this.mainTheme.image;
    }
  }

  onClearClick() {
    this.imageChild.reset();
    this.child.onDeselectPressed();
  }

  onImageDataReceived(imageFormData: FormData) {
    // this.imageData.emit(imageFormData);
  }

  onPictureChanged(url) {
    this.mainTheme.image = url;
  }

  onAddSubThemePressed() {
    this.subThemes.push(new SubTheme(this.mainTheme, '', ''));
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  saveTheme() {
    if (this.mainTheme.name !== '' && this.mainTheme.description !== '') {
      this.http.createMainTheme(this.mainTheme).subscribe(
        (data) => {
          console.log(data);
          this.mainTheme = data;
          this.sendInformation();
        }
      );
    }
  }

  saveSubTheme(st) {
    st.theme = this.mainTheme;
    console.log(this.mainTheme)
    console.log(st);
    this.http.createSubTheme(st).subscribe(
      (data) => {
        this.mainTheme.subThemes.push(data);
      }
    );
  }


  onPageChanged(event) {
    this.chosenThemeId.emit(event);
    this.pageChanged.emit('playingcard');
  }
}
