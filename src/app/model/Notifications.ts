export class Notifications {
  private startGame:Boolean;
  private endGame:Boolean;
  private yourTurn:Boolean;
  private endTurn:Boolean;


  constructor(startGame: Boolean, endGame: Boolean, yourTurn: Boolean, endTurn: Boolean) {
    this.startGame = startGame;
    this.endGame = endGame;
    this.yourTurn = yourTurn;
    this.endTurn = endTurn;
  }

  fromJSON(obj: any){
    this.startGame = obj.startGame;
    this.endGame = obj.endGame;
    this.yourTurn = obj.yourTurn;
    this.endTurn = obj.endTurn;
    return this;
  }

}
