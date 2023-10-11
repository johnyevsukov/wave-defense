import {
  generateRandomWholeNumber,
  generateRandomDecimalNumber,
} from "./utils.js";

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
    this.healthBarHeight = 3;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.x = this.game.width - this.width;
    this.y = generateRandomWholeNumber(0, this.game.height - this.height);
    this.speed = generateRandomDecimalNumber(1, 1.5);
    this.markedForDeletion = false;
  }
  upadate(deltaTimeMultiplier) {
    if (this.x <= -this.width) {
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
    context.fillStyle = "orange";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
