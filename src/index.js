import Encryptor from "./encryptor.js";
import GameLogic from "./game-logic.js";
import Helper from "./helper.js";
import Menu from "./menu.js";
import readline from "readline-sync";

class App {
  constructor(args) {
    this.args = Array.from(args);
    this.logic = new GameLogic(args);
  }
  launch() {
    if (!this.verifyArgs(this.args)) process.exit(1);
    const availableMoves = this.args;

    for (;;) {
      const { key, hmac } = this.initGame();
      console.log(`HMAC: ${hmac}`);

      const selectedItem = this.interactUser();
      if (selectedItem === "0") process.exit(0);
      if (selectedItem === "?") {
        const helper = new Helper(this.logic);
        helper.printHelpTable();
        console.log("\n");
      }
      if (selectedItem > 0 && selectedItem <= availableMoves.length) {
        this.logic.playerMakeMove(selectedItem - 1);

        console.log(`\nYour move: ${availableMoves[this.logic.playerMove]}`);
        console.log(
          `Computer move: ${availableMoves[this.logic.computerMove]}`
        );
        console.log(`Result: ${this.logic.calculateWinner()}`);
        console.log(`Key: ${key}\n`);
      }
    }
  }

  initGame() {
    const key = Encryptor.generateKey();
    const hmac = Encryptor.generateHMAC(
      key,
      this.args[this.logic.computerMakeMove()]
    );
    return {
      key,
      hmac,
    };
  }

  interactUser() {
    const menu = new Menu(this.args);
    menu.printItems();

    const selectedItem = readline.question("Enter your move: ");
    return selectedItem;
  }

  verifyArgs() {
    if (this.args.length % 2 === 0 || this.args.length < 3) {
      console.error(
        "Invalid moves: please pass odd number of moves (3 or more)."
      );
      return false;
    }
    if (new Set(this.args).size !== this.args.length) {
      console.error("Invalid moves: all moves must be distinct.");
      return false;
    }
    return true;
  }
}

const app = new App(process.argv.slice(2).map((arg) => arg.toLowerCase()));
app.launch();
