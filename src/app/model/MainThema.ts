import {USERNAME} from "../services/auth.constant";

export class MainThema {

 name: String;
 description: String;
 subThemes;
 image;


  constructor(name, description, subThemes, image) {
    this.name = name;
    this.description = description;
    this.subThemes = subThemes;
    this.image = image;
  }

  fromJSON(obj: any){
   this.name = obj.name;
   this.description = obj.description;
   this.subThemes = obj.subThemes;
   this.image = obj.image;
    return this;
  }

  setImage(image){
    this.image = image;
  }
}
