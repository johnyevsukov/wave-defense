export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (
        (e.key === "w" ||
          e.key === "s" ||
          e.key === "a" ||
          e.key === "d" ||
          e.key === "1" ||
          e.key === "2" ||
          e.key === "3" ||
          e.key === "4") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "w" ||
        e.key === "s" ||
        e.key === "a" ||
        e.key === "d" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
