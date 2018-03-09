import {USERNAME} from "../services/auth.constant";

export class MainThema {

 name: String;
 description: String;
 subThemes;


  constructor(name, description, subThemes) {
    this.name = name;
    this.description = this.description;
    this.subThemes = subThemes;
  }

  fromJSON(obj: any){
   this.name = obj.name;
   this.description = obj.description;
   this.subThemes = obj.subThemes;
    return this;
  }

}
