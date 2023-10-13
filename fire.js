/**
 * @type { HTMLCanvasElement }
 */

import {
  generateRandomWholeNumber,
  generateRandomDecimalNumber,
} from "./utils.js";

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = generateRandomWholeNumber(2, 4);
    this.height = this.width;
    this.dx = generateRandomWholeNumber(-1, 1);
    this.dy = generateRandomDecimalNumber(-0.5, -1);
    this.speed = generateRandomDecimalNumber(0.2, 1);
    this.deletionTime = generateRandomWholeNumber(1000, 1500);
    this.deletionTimeIncrement = 50;
    this.deletionTimer = 0;
    this.color = "orange";
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

export class Fire {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particleCount = 6;
    this.particles = [];
    this.markedForDeletion = false;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }
  update(deltaTimeMultiplier, x, y) {
    this.x = x;
    this.y = y;
    this.particles.forEach((particle) => {
      particle.update(deltaTimeMultiplier);
    });
    if (this.particles.length < this.particleCount) {
      this.particles.push(new Particle(this.x, this.y));
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
