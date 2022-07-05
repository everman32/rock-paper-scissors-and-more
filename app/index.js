import Encryptor from "./encryptor.js";
import Menu from "./menu.js";
import GameLogic from "./game-logic.js";
import Helper from "./helper.js";

class App {
  constructor(args) {
    this.args = Array.from(args);
  }
  launch() {
    if (!this.verifyArgs(this.args)) return 0;
    const availableMoves = this.args;

    const logic = new GameLogic(availableMoves);
    const menu = new Menu(availableMoves);
    const helper = new Helper(logic);
    const encryptor = new Encryptor();

    let gameContinues = true;

    while (gameContinues) {
      const key = encryptor.generateKey();
      const computerMove = logic.computerMakeMove();
      const hmac = encryptor.generateHMAC(availableMoves[computerMove], key);

      console.log(`HMAC: ${hmac}`);

      menu.printItems();
      const selectedItem = menu.selectItem();
      if (selectedItem === 0) gameContinues = false;
      if (selectedItem === -1) {
        helper.printHelpTable();
        console.log("\n");
      }
      if (selectedItem > 0) {
        const playerMove = logic.playerMakeMove(selectedItem - 1);

        console.log(`\nYour move: ${availableMoves[playerMove]}`);
        console.log(`Computer move: ${availableMoves[computerMove]}`);
        console.log(`Result: ${logic.calculateWinner()}`);

        console.log(`Key: ${key}\n`);
      }
    }
  }

  verifyArgs() {
    if (this.args.length < 3 || this.args.length % 2 == 0) {
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
