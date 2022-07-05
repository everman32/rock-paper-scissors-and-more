import WordTable from "word-table";

export default class Helper {
  constructor(logic) {
    this.logic = logic;
  }
  printHelpTable() {
    const header = this.createHeader();
    const body = this.createBody();

    const table = new WordTable(header, body);
    console.log(table.string());
  }
  createHeader() {
    const header = [...this.logic.options];
    header.unshift("[User \\ PC]");
    return header;
  }
  createBody() {
    const body = [];
    this.logic.options.forEach((horizontOption, horizontIndex) => {
      const row = [];
      row.push(horizontOption);
      this.logic.options.forEach((verticalOption, verticalIndex) => {
        row.push(this.logic.calculateWinner(horizontIndex, verticalIndex));
      });
      body.push(row);
    });
    return body;
  }
}
