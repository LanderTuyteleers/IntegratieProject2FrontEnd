import { Component, OnInit } from '@angular/core';
import {AppDataService} from "../../services/app-data.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  private fileService: AppDataService;
  public image: File;
  imageUrl: String;

  constructor(fileService: AppDataService) {
    this.fileService = fileService;
  }

  doUploadFile(){
    //Service upload
  }

  onChange(event){
    this.image = event.srcElement.files[0];
    this.readUrl(event);
    this.doUploadFile()
  }

  readUrl(event){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
  }

}
