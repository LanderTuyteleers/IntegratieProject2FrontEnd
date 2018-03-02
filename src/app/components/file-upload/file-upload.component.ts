import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppDataService} from "../../services/app-data.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private imageFile;
  private http;
  @Input() public _user$: User;
  private uploadData;

  constructor(http: AppDataService) {
    this.http = http;
  }

  form = new FormGroup({
    'profilePicture': new FormControl('')
  });

  ngOnInit() {
  }

  uploadFile(event) {
    // let inputElement: HTMLInputElement = event.srcElement;
    // let image = event.srcElement.files.item(0);
    // let formData = new FormData();
    // formData.append('file', image);
    // console.log(formData);
    // this.uploadData = formData;
    this.imageFile = event.srcElement.files;
  }

  clickUpload(){
    // this.http.uploadProfileImage(this._user$.username, this.uploadData);
    if(this.imageFile != null){
      this.http.uploadProfileImage(this._user$.username, this.imageFile);
    }
  }

}
