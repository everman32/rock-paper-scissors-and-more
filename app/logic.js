export const result = Object.freeze({
  WIN: "WIN",
  LOSE: "LOSE",
  DRAW: "DRAW",
});

export default class Logic {
  constructor(moveCount) {
    this.moveCount = moveCount;
  }

  decide(firstMove, secondMove) {
    if (firstMove == secondMove) {
      return result.DRAW;
    } else if (
      (secondMove > firstMove &&
        secondMove - firstMove <= this.moveCount / 2) ||
      (secondMove < firstMove && firstMove - secondMove > this.moveCount / 2)
    ) {
      return result.WIN;
    } else return result.LOSE;
  }
}
