import readline from "readline-sync";

export default class Menu {
  constructor(items) {
    this.items = new Map(
      items.map((value, index) => {
        return [index + 1, value];
      })
    )
      .set(0, "Exit")
      .set("?", "Help");
  }

  printItems() {
    console.log("Available items:");
    this.items.forEach((value, key) => {
      console.log(`${key} - ${value}`);
    });
  }

  selectItem() {
    const input = readline.question("Enter your move: ");
    if (input === "0") return 0;
    if (input === "?") return -1;
    if (input > 0 && input <= this.items.size - 2) return input;
  }
}
