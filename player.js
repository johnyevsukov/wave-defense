/**
 * @type { HTMLCanvasElement }
 */

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.boundaries = {
      top: 0,
      bottom: this.game.height - this.height,
      left: 0,
      right: this.game.width - this.width,
    };
    this.x = 20;
    this.y = this.boundaries.bottom - 20;
    this.speed = 3;
    this.rotation = 0;
    this.image = document.getElementById("playerSprite");
  }
  checkMapBoundaries() {
    if (this.x < this.boundaries.left) {
      this.x = this.boundaries.left;
    } else if (this.x > this.boundaries.right) {
      this.x = this.boundaries.right;
    } else if (this.y < this.boundaries.top) {
      this.y = this.boundaries.top;
    } else if (this.y > this.boundaries.bottom) {
      this.y = this.boundaries.bottom;
    }
  }
  update(inputKeys, deltaTimeMultiplier) {
    const normalizedSpeed = this.speed * deltaTimeMultiplier;
    this.rotation = Math.atan2(
      this.game.cursorX - this.x,
      -(this.game.cursorY - this.y)
    );
    if (inputKeys.includes("w")) {
      this.y -= normalizedSpeed;
    }
    if (inputKeys.includes("s")) {
      this.y += normalizedSpeed;
    }
    if (inputKeys.includes("a")) {
      this.x -= normalizedSpeed;
    }
    if (inputKeys.includes("d")) {
      this.x += normalizedSpeed;
    }
    this.checkMapBoundaries();
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
