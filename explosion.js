/**
 * @type { HTMLCanvasElement }
 */

import {
  generateRandomWholeNumber,
  generateRandomDecimalNumber,
} from "./utils.js";

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = generateRandomWholeNumber(1, 3);
    this.height = this.width;
    this.dx = generateRandomDecimalNumber(-1, 1);
    this.dy = generateRandomDecimalNumber(-1, 1);
    this.speed = generateRandomWholeNumber(8, 12);
    this.deletionTime = generateRandomWholeNumber(300, 800);
    this.deletionTimeIncrement = 50;
    this.deletionTimer = 0;
    this.color = color;
    this.markedForDeletion = false;
  }
  update(deltaTimeMultiplier) {
    const normalizedSpeedX = this.dx * this.speed * deltaTimeMultiplier;
    const normalizedSpeedY = this.dy * this.speed * deltaTimeMultiplier;
    this.deletionTimer += this.deletionTimeIncrement * deltaTimeMultiplier;
    this.x += normalizedSpeedX;
    this.y += normalizedSpeedY;
    if (this.deletionTimer >= this.deletionTime) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Explosion {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particleCount = generateRandomWholeNumber(6, 10);
    this.particles = [];
    this.markedForDeletion = false;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }
  update(deltaTimeMultiplier) {
    this.particles.forEach((particle) => {
      particle.update(deltaTimeMultiplier);
    });
    if (!this.particles.length) {
      this.markedForDeletion = true;
    }
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
  }
  draw(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }
}
