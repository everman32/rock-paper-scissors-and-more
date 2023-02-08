export default class GameLogic {
  constructor(availableMoves) {
    this.availableMoves = availableMoves;
    this.playerMove = undefined;
    this.computerMove = undefined;
  }

  computerMakeMove() {
    this.computerMove = Math.floor(Math.random() * this.availableMoves.length);
    return this.computerMove;
  }

  playerMakeMove(choise) {
    this.playerMove = Number.parseInt(choise, 10);
    return this.playerMove;
  }

  calculateWinner(
    playerMove = this.playerMove,
    computerMove = this.computerMove
  ) {
    if (computerMove === playerMove) return "draw";
    if (
      (playerMove > computerMove &&
        playerMove - computerMove <= this.availableMoves.length / 2) ||
      (playerMove < computerMove &&
        computerMove - playerMove > this.availableMoves.length / 2)
    )
      return "lose";
    return "win";
  }
}
