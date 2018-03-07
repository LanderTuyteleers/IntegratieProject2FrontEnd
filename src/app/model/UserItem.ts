export class UserItem {

  private username;
  private firstName;
  private lastName;
  private email;
  private role;
  public profilePicture;

  constructor() {
    this.username = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.role = "";
    this.profilePicture = "";
  }

  fromJSON(obj: any){
    this.username = obj.username;
    this.firstName = obj.firstName;
    this.lastName= obj.lastName;
    this.email = obj.email;
    this.role = obj.role;
    return this;
  }

  getRole(){
    return this.role;
  }

  getUsername(){
    return this.username;
  }

  getFirstName(){
    return this.firstName;
  }

  getLastName(){
    return this.lastName;
  }

  getEmail(){
    return this.email;
  }

  getProfilePicture(){
    return this.profilePicture;
  }


  setProfilePicture(picture){
    this.profilePicture = picture;
  }

}
