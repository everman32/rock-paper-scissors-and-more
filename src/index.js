import readline from "readline-sync";
import encryptor from "./encryptor.js";
import GameLogic from "./game-logic.js";
import Helper from "./helper.js";
import Menu from "./menu.js";
import validator from "./validator.js";

class App {
  constructor(menu, logic, helper) {
    this.menu = menu;
    this.logic = logic;
    this.helper = helper;
  }

  launch() {
    const moves = this.logic.availableMoves;

    for (;;) {
      const { key, hmac } = this.initGame();
      console.log(`HMAC: ${hmac}`);

      const selectedItem = this.interactUser();
      if (selectedItem === "0") return 0;
      if (selectedItem === "?") {
        this.helper.printHelpTable();
        console.log("\n");
      }
      if (selectedItem > 0 && selectedItem <= moves.length) {
        this.logic.playerMakeMove(selectedItem - 1);

        console.log(`\nYour move: ${moves[this.logic.playerMove]}`);
        console.log(`Computer move: ${moves[this.logic.computerMove]}`);
        console.log(`Result: ${this.logic.calculateWinner()}`);
        console.log(`Key: ${key}\n`);
      }
    }
  }

  initGame() {
    const key = encryptor.generateKey();
    const hmac = encryptor.generateHMAC(
      key,
      this.logic.availableMoves[this.logic.computerMakeMove()]
    );
    return {
      key,
      hmac,
    };
  }

  interactUser() {
    this.menu.printItems();

    return readline.question("Enter your move: ");
  }
}

const options = process.argv.slice(2).map((option) => option.toLowerCase());
if (
  validator.verifyOddOptions(options) &&
  validator.verifyDistinctOptions(options)
) {
  const menu = new Menu(options);
  const logic = new GameLogic(options);
  const helper = new Helper(logic);

  const app = new App(menu, logic, helper);
  app.launch();
}
