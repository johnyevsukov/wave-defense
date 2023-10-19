/**
 * @type { HTMLCanvasElement }
 */

/* render game background image */

export class Background {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("background");
  }
  draw(context) {
    context.save();
    context.drawImage(
      this.image,
      0,
      this.game.topBar.height,
      this.game.width,
      this.game.height - this.game.topBar.height
    );
    context.restore();
  }
}
