import crypto from "node:crypto";

export default class GameLogic {
  constructor(options) {
    this.availableMoves = options;
    this.playerMove = undefined;
    this.computerMove = undefined;
  }

  computerMakeMove() {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xff_ff_ff_ff + 1);
    this.computerMove = Math.floor(randomNumber * this.availableMoves.length);

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
