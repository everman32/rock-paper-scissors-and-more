export default class Helper {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }

  printHelpTable() {
    console.table(this.createBody());
  }

  createBody() {
    const availableMoves = this.gameLogic.availableMoves;

    return availableMoves.reduce((body, rowMove, rowIndex) => {
      body[rowMove] = availableMoves.reduce(
        (columnObject, colMove, colIndex) => {
          columnObject[colMove] = this.gameLogic.calculateWinner(
            rowIndex,
            colIndex
          );
          return columnObject;
        },
        {}
      );
      return body;
    }, {});
  }
}
