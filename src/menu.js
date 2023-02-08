export default class Menu {
  constructor(options) {
    this.items = new Map(
      options.map((value, index) => {
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
}
