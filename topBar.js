/**
 * @type { HTMLCanvasElement }
 */

export class TopBar {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = 50;
    this.image = document.getElementById("topBar");
  }
  draw(context) {
    context.drawImage(this.image, 0, 0, this.width, this.height);
    context.fillStyle = "red";
    context.font = "35px Arial";
    context.fillText(this.game.lives, 70, 36);
    context.fillStyle = "gold";
    context.font = "35px Arial";
    context.fillText(this.game.coins, 189, 36);
  }
}
