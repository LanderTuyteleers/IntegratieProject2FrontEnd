import {USERNAME} from "../services/auth.constant";

export class Playingcard {

  public playingcardId;
  public name;
  public description;
  public organisator; //Username of organisator/creator
  public isDefaultCard;
  protected isOrganiser = false;
  protected isSubOrganiser = false;
  protected subOrganisators;

  //TODO: list controleren CardSubtheme
  public cardSubThemes;


  constructor(name, description, organisator,subOrganisators, isDefaultCard, cardSubThemes) {
    this.organisator = organisator;
    this.subOrganisators = subOrganisators;
    this.name = name;
    this.description = description;
    this.isDefaultCard = isDefaultCard;
    this.cardSubThemes = cardSubThemes;
  }

  fromJSON(obj: any){
    this.playingcardId = obj.playingcardId;
    this.name = obj.name;
    this.description = obj.description;
    this.isDefaultCard = obj.isDefaultCard;
    this.organisator = obj.organisator;
    this.subOrganisators = obj.subOrganisators;
    this.cardSubThemes = obj.cardSubThemes;
    this.checkIfOrganiser();
    this.checkIfSubOrganiser();
    return this;
  }

  checkIfOrganiser(){
    if(sessionStorage.getItem(USERNAME) === this.organisator){
      this.isOrganiser = true;
    }
  }

  checkIfSubOrganiser(){
    let username = sessionStorage.getItem(USERNAME);
    console.log(this);
    if(this.subOrganisators.indexOf(username) !== -1){
      this.isSubOrganiser = true;
    }
  }


  getIsOrganisator(){
    return this.isOrganiser;
  }

  getIsSubOrganistor(){
    return this.isSubOrganiser;
  }

  setSubOrganisators(subOrganisators){
    this.subOrganisators = subOrganisators;
  }
}
