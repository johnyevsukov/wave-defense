/**
 * @type { HTMLCanvasElement }
 */

import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { Grunt } from "./enemy.js";
import { Turret } from "./turret.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("mainCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.fps = 60;
      this.frameInterval = 1000 / this.fps;
      this.width = width;
      this.height = height;
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.enemies = [
        new Grunt(this),
        new Grunt(this),
        new Grunt(this),
        new Grunt(this),
      ];
      this.turrets = [new Turret(this, 50, 200)];
      this.explosions = [];
      this.cursorX = 0;
      this.cursorY = 0;
      window.addEventListener("mousemove", (e) => {
        this.cursorX = e.clientX - (window.innerWidth / 2 - this.width / 2);
        this.cursorY = e.clientY - (window.innerHeight / 2 - this.height / 2);
      });
    }
    update(deltaTimeMultiplier) {
      this.player.update(this.input.keys, deltaTimeMultiplier);
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTimeMultiplier);
      });
      this.turrets.forEach((turret) => {
        turret.update(deltaTimeMultiplier);
      });
      this.explosions.forEach((explosion) => {
        explosion.update(deltaTimeMultiplier);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markedForDeletion
      );
    }
    draw(ctx) {
      this.player.draw(ctx);
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });
      this.explosions.forEach((explosion) => {
        explosion.draw(ctx);
      });
      this.turrets.forEach((turret) => {
        turret.draw(ctx);
      });
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    const deltaTimeMultiplier = deltaTime / game.frameInterval;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTimeMultiplier);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
