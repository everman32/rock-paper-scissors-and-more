import readline from "node:readline";
import encryptor from "./encryptor.js";
import GameLogic from "./game-logic.js";
import Helper from "./helper.js";
import Menu from "./menu.js";
import validator from "./validator.js";

class App {
  constructor(menu, gameLogic, helper) {
    this.menu = menu;
    this.gameLogic = gameLogic;
    this.helper = helper;
  }

  async launch() {
    const moves = this.gameLogic.availableMoves;

    for (;;) {
      const { key, hmac } = this.initGame();
      console.log(`HMAC: ${hmac}`);

      const input = await this.interactWithUser();
      if (input === "0") return 0;
      if (input === "?") {
        this.helper.printHelpTable();
        console.log("\n");
      }
      if (input > 0 && input <= moves.length) {
        this.gameLogic.playerMakeMove(input - 1);

        console.log(`\nYour move: ${moves[this.gameLogic.playerMove]}`);
        console.log(`Computer move: ${moves[this.gameLogic.computerMove]}`);
        console.log(`Result: ${this.gameLogic.calculateWinner()}`);
        console.log(`Key: ${key}\n`);
      }
    }
  }

  initGame() {
    const key = encryptor.generateKey();
    const hmac = encryptor.generateHMAC(
      key,
      this.gameLogic.availableMoves[this.gameLogic.computerMakeMove()]
    );
    return {
      key,
      hmac,
    };
  }

  async interactWithUser() {
    this.menu.printItems();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const prompt = () =>
      new Promise((resolve) => rl.question("Enter your move: ", resolve));
    const move = await prompt();
    rl.close();
    return move;
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
