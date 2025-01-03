import WordTable from "word-table";

export default class Helper {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }

  printHelpTable() {
    const header = this.createHeader();
    const body = this.createBody();

    const table = new WordTable(header, body);
    console.log(table.string());
  }

  createHeader() {
    const header = [...this.gameLogic.availableMoves];
    header.unshift(String.raw`[User \ PC]`);
    return header;
  }

  createBody() {
    const body = [];
    this.gameLogic.availableMoves.forEach((horizontOption, horizontIndex) => {
      const row = [];
      row.push(horizontOption);
      this.gameLogic.availableMoves.forEach((verticalOption, verticalIndex) => {
        row.push(this.gameLogic.calculateWinner(horizontIndex, verticalIndex));
      });
      body.push(row);
    });
    return body;
  }
}
