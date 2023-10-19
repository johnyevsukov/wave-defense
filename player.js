/**
 * @type { HTMLCanvasElement }
 */

/* game player */

import { checkRectangularCollision, playSfx } from "./utils.js";

class Shot {
  constructor(game, player, dx, dy) {
    this.game = game;
    this.width = 4;
    this.height = 4;
    this.boundaries = {
      top: this.game.topBar.height,
      bottom: this.game.height - this.height,
      left: 0,
      right: this.game.width - this.width,
    };
    this.x = player.x + player.width / 2 - this.width / 2;
    this.y = player.y + player.height / 2 - this.height / 2;
    this.dx = dx;
    this.dy = dy;
    this.damage = 20;
    this.speed = 10;
    this.markedForDeletion = false;
  }
  checkMapBoundaries() {
    if (
      this.x < this.boundaries.left ||
      this.x > this.boundaries.right ||
      this.y < this.boundaries.top ||
      this.y > this.boundaries.bottom
    ) {
      this.markedForDeletion = true;
    }
  }
  checkEnemyCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        checkRectangularCollision(
          this.x,
          this.y,
          this.width,
          this.height,
          enemy.x,
          enemy.y,
          enemy.width,
          enemy.height
        )
      ) {
        this.markedForDeletion = true;
        enemy.health -= this.damage;
      }
    });
  }
  update(deltaTimeMultiplier) {
    const normalizedSpeedX = this.dx * this.speed * deltaTimeMultiplier;
    const normalizedSpeedY = this.dy * this.speed * deltaTimeMultiplier;
    this.x += normalizedSpeedX;
    this.y += normalizedSpeedY;
    this.checkEnemyCollision();
    this.checkMapBoundaries();
  }
  draw(context) {
    context.save();
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.boundaries = {
      top: this.game.topBar.height,
      bottom: this.game.height - this.height,
      left: 0,
      right: this.game.width - this.width,
    };
    this.x = 20;
    this.y = this.boundaries.bottom - 20;
    this.speed = 3;
    this.rotation = 0;
    this.shots = [];
    this.sfx = new Audio();
    this.sfx.src = "sfx/player-shot.wav";
    this.image = document.getElementById("playerSprite");
    window.addEventListener("click", (e) => {
      playSfx(this.sfx);

      const mouseClickX =
        e.pageX - (window.innerWidth / 2 - this.game.width / 2);
      const mouseClickY =
        e.pageY - (window.innerHeight / 2 - this.game.height / 2);

      const x = mouseClickX - (this.x + this.width / 2);
      const y = mouseClickY - (this.y + this.height / 2);
      const l = Math.sqrt(x * x + y * y);

      const dx = x / l;
      const dy = y / l;
      this.shots.push(new Shot(this.game, this, dx, dy));
    });
  }
  checkMapBoundaries() {
    if (this.x < this.boundaries.left) {
      this.x = this.boundaries.left;
    } else if (this.x > this.boundaries.right) {
      this.x = this.boundaries.right;
    }
    if (this.y < this.boundaries.top) {
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
    this.shots.forEach((shot) => {
      shot.update(deltaTimeMultiplier);
    });
    this.shots = this.shots.filter((shot) => !shot.markedForDeletion);
  }
  draw(context) {
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.rotation);
    context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();
    context.save();
    this.shots.forEach((shot) => {
      shot.draw(context);
    });
    context.restore();
  }
}
