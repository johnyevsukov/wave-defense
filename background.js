export class Background {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("background");
  }
  draw(context) {
    context.drawImage(
      this.image,
      0,
      this.game.topBar.height,
      this.game.width,
      this.game.height - this.game.topBar.height
    );
  }
}
