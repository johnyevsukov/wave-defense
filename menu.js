/**
 * @type { HTMLCanvasElement }
 */

/* render game conrol and info menus */

export class Menu {
  constructor(game) {
    this.game = game;
    this.width = 750;
    this.height = 440;
    this.isOpen = true;
    this.toggleMenu = this.debouncedMenuToggle();
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;
    this.infoImage = document.getElementById("info");
    this.controlsImage = document.getElementById("controls");
    this.currentMenu = "";
    this.keys = [];
  }
  debouncedMenuToggle() {
    let timeoutId;
    return function () {
      if (this.keys.includes("i")) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (this.currentMenu === "info") {
            this.currentMenu = "";
            this.isOpen = false;
          } else {
            this.isOpen = true;
            this.currentMenu = "info";
          }
        }, 50);
      }
      if (this.keys.includes("c")) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (this.currentMenu === "controls") {
            this.currentMenu = "";
            this.isOpen = false;
          } else {
            this.isOpen = true;
            this.currentMenu = "controls";
          }
        }, 50);
      }
    };
  }
  update(inputKeys) {
    this.keys = inputKeys;
    if (this.keys.includes("Escape")) {
      this.isOpen = false;
      this.currentMenu = "";
    }
    if (this.keys.includes("c") || this.keys.includes("i")) {
      this.toggleMenu();
    }
  }
  draw(context) {
    context.save();
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.drawImage(
      this.currentMenu === "info" ? this.infoImage : this.controlsImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.restore();
  }
}
