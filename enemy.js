/**
 * @type { HTMLCanvasElement }
 */

import {
  generateRandomWholeNumber,
  generateRandomDecimalNumber,
} from "./utils.js";
import { Explosion } from "./explosion.js";

class Enemy {
  constructor(game) {
    this.game = game;
  }
}

export class Grunt extends Enemy {
  constructor(game) {
    super(game);
    this.width = 20;
    this.height = 20;
    this.color = "orange";
    this.healthBarHeight = 3;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.x = this.game.width - this.width;
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
    this.speed = generateRandomDecimalNumber(0.8, 1.2);
    this.markedForDeletion = false;
  }
  update(deltaTimeMultiplier) {
    if (this.x <= -this.width) {
      this.markedForDeletion = true;
    }
    if (this.health <= 0) {
      this.game.explosions.push(new Explosion(this.x, this.y, this.color));
      this.markedForDeletion = true;
    }
    const normalizedSpeed = this.speed * deltaTimeMultiplier;
    this.x -= normalizedSpeed;
  }
  draw(context) {
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
  }
}

export class Runner extends Enemy {
  constructor(game) {
    super(game);
    this.width = 20;
    this.height = 20;
    this.color = "red";
    this.healthBarHeight = 3;
    this.maxHealth = 40;
    this.health = this.maxHealth;
    this.x = this.game.width - this.width;
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
    this.speed = generateRandomDecimalNumber(1.5, 3);
    this.markedForDeletion = false;
  }
  update(deltaTimeMultiplier) {
    if (this.x <= -this.width) {
      this.markedForDeletion = true;
    }
    if (this.health <= 0) {
      this.game.explosions.push(new Explosion(this.x, this.y, this.color));
      this.markedForDeletion = true;
    }
    const normalizedSpeed = this.speed * deltaTimeMultiplier;
    this.x -= normalizedSpeed;
  }
  draw(context) {
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
  }
}

export class Tank extends Enemy {
  constructor(game) {
    super(game);
    this.width = 40;
    this.height = 40;
    this.color = "purple";
    this.healthBarHeight = 3;
    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.x = this.game.width - this.width;
    this.y = generateRandomWholeNumber(
      this.game.topBar.height,
      this.game.height - this.height
    );
    this.speed = generateRandomDecimalNumber(0.5, 1);
    this.markedForDeletion = false;
  }
  update(deltaTimeMultiplier) {
    if (this.x <= -this.width) {
      this.markedForDeletion = true;
    }
    if (this.health <= 0) {
      this.game.explosions.push(new Explosion(this.x, this.y, this.color));
      this.markedForDeletion = true;
    }
    const normalizedSpeed = this.speed * deltaTimeMultiplier;
    this.x -= normalizedSpeed;
  }
  draw(context) {
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
  }
}
