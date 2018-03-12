export class Message{
  public messageId;
  public user;
  public session;
  public content;
  public dateTime: Date;


  constructor(user, session, content, dateTime: Date) {
    this.user = user;
    this.session = session;
    this.content = content;
    this.dateTime = dateTime;
  }
}
