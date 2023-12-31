/**
 * @type { HTMLCanvasElement }
 */

/* grunt, runner, and tank enemies */

import {
  generateRandomWholeNumber,
  generateRandomDecimalNumber,
} from "./utils.js";
import { Explosion } from "./explosion.js";
import { Fire } from "./fire.js";
import { playSfx } from "./utils.js";

export class Grunt {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.color = "orange";
    this.healthBarHeight = 3;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.damage = 2;
    this.value = 2;
    this.x = this.game.width - this.width;
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
    this.speed = generateRandomDecimalNumber(0.6, 0.8);
    this.burnRate = 0;
    this.fire = null;
    this.damageSfx = new Audio();
    this.damageSfx.src = "sfx/hit.wav";
    this.defeatSfx = new Audio();
    this.defeatSfx.src = "sfx/enemy-defeat.wav";
    this.markedForDeletion = false;
  }
  update(deltaTimeMultiplier) {
    if (this.burnRate) {
      if (!this.fire) {
        this.fire = new Fire(this.x, this.y);
      } else {
        this.fire.update(deltaTimeMultiplier, this.x + this.width / 2, this.y);
      }
      this.health -= this.burnRate * deltaTimeMultiplier;
    }
    if (this.x <= -this.width) {
      playSfx(this.damageSfx, this.game.muted);
      this.markedForDeletion = true;
      this.game.lives -= this.damage;
    }
    if (this.health <= 0) {
      playSfx(this.defeatSfx, this.game.muted);
      this.game.explosions.push(new Explosion(this.x, this.y, this.color));
      this.markedForDeletion = true;
      this.game.coins += this.value;
    }
    const normalizedSpeed = this.speed * deltaTimeMultiplier;
    this.x -= normalizedSpeed;
  }
  draw(context) {
    if (this.fire) {
      this.fire.draw(context);
    }
    context.save();
    context.fillStyle = "red";
    context.fillRect(
      this.x,
      this.y - this.healthBarHeight * 2,
      this.width,
      this.healthBarHeight
    );
    context.fillStyle = "lightGreen";
    context.fillRect(
      this.x,
      this.y - this.healthBarHeight * 2,
      this.width * (this.health / this.maxHealth),
      this.healthBarHeight
    );
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

export class Runner extends Grunt {
  constructor(game) {
    super(game);
    this.color = "red";
    this.maxHealth = 40;
    this.health = this.maxHealth;
    this.damage = 1;
    this.value = 1;
    this.speed = generateRandomDecimalNumber(1.5, 3);
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
  }
}

export class Tank extends Grunt {
  constructor(game) {
    super(game);
    this.width = 40;
    this.height = 40;
    this.color = "purple";
    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.damage = 4;
    this.value = 4;
    this.speed = generateRandomDecimalNumber(0.2, 0.4);
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
  }
}
