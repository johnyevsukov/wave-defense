/**
 * @type { HTMLCanvasElement }
 */

import { InputHandler } from "./inputHandler.js";
import { TopBar } from "./topBar.js";
import { Background } from "./background.js";
import { Player } from "./player.js";
import { Menu } from "./menu.js";
import { waves, addWaveEnemies, drawWaveText } from "./waves.js";
import { EndGameMessage } from "./endGameMessage.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("mainCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 880;
  canvas.height = 510;

  class Game {
    constructor(width, height) {
      this.fps = 60;
      this.frameInterval = 1000 / this.fps;
      this.width = width;
      this.height = height;
      this.coins = 0;
      this.maxLives = 20;
      this.lives = this.maxLives;
      this.currentWaveIndex = 0;
      this.currentWave = waves[this.currentWaveIndex];
      this.topBar = new TopBar(this);
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.menu = new Menu(this);
      this.background = new Background(this);
      this.endGameMessage = new EndGameMessage(this);
      this.enemies = [];
      this.turrets = [];
      this.explosions = [];
      this.lost = false;
      this.won = false;
      this.restartGame = this.debouncedGameRestart();
      this.cursorX = 0;
      this.cursorY = 0;
      window.addEventListener("mousemove", (e) => {
        this.cursorX = e.clientX - (window.innerWidth / 2 - this.width / 2);
        this.cursorY = e.clientY - (window.innerHeight / 2 - this.height / 2);
      });
      addWaveEnemies(this, waves[this.currentWaveIndex]);
    }
    // prevent spamming game restart
    debouncedGameRestart() {
      let timeoutId;
      return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.coins = 0;
          this.lives = this.maxLives;
          this.currentWaveIndex = -1;
          this.enemies = [];
          this.turrets = [];
          this.explosions = [];
          this.lost = false;
          this.won = false;
          this.player.x = 20;
          this.x = 20;
          this.y = this.height - this.player.height - 20;
        }, 50);
      };
    }
    primaryGameUpdate(deltaTimeMultiplier) {
      // loss condition
      if (this.lives <= 0) {
        this.lost = true;
      }
      // next wave condition
      else if (
        !this.enemies.length &&
        this.currentWaveIndex + 1 < waves.length
      ) {
        this.currentWaveIndex += 1;
        addWaveEnemies(this, waves[this.currentWaveIndex]);
      }
      // win condition
      else if (
        !this.enemies.length &&
        this.currentWaveIndex + 1 === waves.length
      ) {
        this.won = true;
      }
      // update all assets
      this.topBar.update(this.input.keys);
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
    update(deltaTimeMultiplier) {
      if (!this.menu.isOpen && !this.won && !this.lost) {
        this.primaryGameUpdate(deltaTimeMultiplier);
      }
      if (!this.won && !this.lost) {
        this.menu.update(this.input.keys);
      }
      if (this.input.keys.includes("r")) {
        this.restartGame();
      }
    }
    draw(ctx) {
      // render all assets
      this.background.draw(ctx);
      this.topBar.draw(ctx);
      drawWaveText(this, ctx);
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
      if (this.won || this.lost) {
        this.endGameMessage.draw(ctx);
      }
      if (this.menu.isOpen) {
        this.menu.draw(ctx);
      }
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  // animation loop
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
