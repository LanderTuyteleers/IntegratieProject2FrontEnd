import {USERNAME} from "../services/auth.constant";
import {MainThema} from "./MainThema";

export class GameSession {

  public users; //All users that play in the session
  public organisator; //Username of organisator
  public isOrganisatorPlaying;
  public allowUsersToAdd;
  public limit;
  public selectionLimit;
  public timer;
  public title;
  public gameSessionId;
  protected isOrganiser = false;
  protected isSubOrganiser = false;
  protected subOrganisators;

  //TEST
  public themeForSession: MainThema;


  constructor(users, organisator, isOrganisatorPlaying, allowUsersToAdd, limit, selectionLimit, timer, title, subOrganisators) {
    this.users = users;
    this.organisator = organisator;
    this.isOrganisatorPlaying = isOrganisatorPlaying;//
    this.allowUsersToAdd = allowUsersToAdd; //
    this.limit = limit;//
    this.selectionLimit = selectionLimit;//
    this.timer = timer;
    this.title = title;//
    this.subOrganisators = subOrganisators;
  }

  fromJSON(obj: any){
    this.isOrganisatorPlaying = obj.organisatorPlaying;
    this.allowUsersToAdd = obj.allowUsersToAdd;
    this.limit = obj.limit;
    this.selectionLimit = obj.selectionLimit;
    this.timer = obj.timer;
    this.title = obj.title;
    this.organisator = obj.organisator;
    this.gameSessionId = obj.gameSessionId;
    this.subOrganisators = obj.subOrganisators;
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
