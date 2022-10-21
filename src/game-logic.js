export default class GameLogic {
  constructor(availableMoves) {
    this.availableMoves = availableMoves;
    this.playerMove = undefined;
    this.computerMove = undefined;
    this.result = {
      win: "win",
      lose: "lose",
      draw: "draw",
    };
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
    if (computerMove === playerMove) return this.result.draw;
    if (
      (playerMove > computerMove &&
        playerMove - computerMove <= this.availableMoves.length / 2) ||
      (playerMove < computerMove &&
        computerMove - playerMove > this.availableMoves.length / 2)
    )
      return this.result.lose;
    return this.result.win;
  }
}
