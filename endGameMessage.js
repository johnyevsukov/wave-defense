/**
 * @type { HTMLCanvasElement }
 */

/* render end of game message on screen
in case of victory or defeat */

export class EndGameMessage {
  constructor(game) {
    this.game = game;
  }
  draw(context) {
    context.save();
    // dark screen overlay
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, this.game.width, this.game.height);

    // victory / defeat text
    context.font = "100px Arial";
    context.fillStyle = "white";
    if (this.game.won) {
      context.fillText(
        "VICTORY!",
        this.game.width - 675,
        this.game.height / 2 + 32
      );
    } else if (this.game.lost) {
      context.fillText(
        "DEFEAT!",
        this.game.width - 650,
        this.game.height / 2 + 32
      );
    }

    // restart game text
    context.font = "40px Arial";
    context.fillText(
      'Press "r" to restart',
      this.game.width - 600,
      this.game.height / 2 + 96
    );
    context.restore();
  }
}
