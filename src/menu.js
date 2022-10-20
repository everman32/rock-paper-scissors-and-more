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
}
