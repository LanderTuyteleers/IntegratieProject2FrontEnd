import {USERNAME} from "../services/auth.constant";

export class GameSession {

  //TODO ervoor zorgen dat edit knop ook showt wnr iemand een suborganisator is
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

  constructor(users, organisator, isOrganisatorPlaying, allowUsersToAdd, limit, selectionLimit, timer, title) {
    this.users = users;
    this.organisator = organisator;
    this.isOrganisatorPlaying = isOrganisatorPlaying;//
    this.allowUsersToAdd = allowUsersToAdd; //
    this.limit = limit;//
    this.selectionLimit = selectionLimit;//
    this.timer = timer;
    this.title = title;//
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
    this.checkIfOrganiser();
    return this;
  }

  checkIfOrganiser(){
    if(sessionStorage.getItem(USERNAME) === this.organisator){
      this.isOrganiser = true;
    }
  }

  getIsOrganisator(){
    return this.isOrganiser;
  }
}
