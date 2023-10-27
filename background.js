/**
 * @type { HTMLCanvasElement }
 */

/* render game background image, mute toggle image, and info / controls keys text */

export class Background {
  constructor(game) {
    this.game = game;
    this.muteImage = document.getElementById("mute");
    this.soundImage = document.getElementById("sound");
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
    context.drawImage(
      this.game.muted ? this.muteImage : this.soundImage,
      this.game.width - 37,
      this.game.height - 37,
      35,
      35
    );
    context.fillStyle = "rgba(0, 0, 0, 0.2)";
    context.font = "12px 'Press Start 2P'";
    context.fillText(
      '"c" - controls',
      this.game.width - 860,
      this.game.height - 7
    );
    context.fillText('"i" - info', this.game.width - 650, this.game.height - 7);
    context.restore();
  }
}
