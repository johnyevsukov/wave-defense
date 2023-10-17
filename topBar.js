/**
 * @type { HTMLCanvasElement }
 */

import { FireTurret, SlimeTurret, TeleportTurret, Turret } from "./turret.js";
import { turretPoints } from "./turretPoints.js";
import { checkRectangularCollision } from "./utils.js";

const turretMap = {
  SLIME: 0,
  BASIC: 1,
  FIRE: 2,
  TELEPORT: 3,
};

const translucentRed = "rgba(255, 0, 0, 0.3)";
const translucentOrange = "rgba(255, 197, 0, 0.3)";
const translucentGreen = "rgba(42, 255, 0, 0.3)";
const translucentDarkGreen = "rgba(0, 195, 0, 0.8)";

const turretSpaceWidth = 40;

export class TopBar {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = 50;
    this.turretChoiceWidth = 124;
    this.turretChoices = [
      {
        price: 10,
        addTurret: (x, y) => {
          this.game.turrets.push(
            new SlimeTurret(this.game, x, y + this.height)
          );
        },
        barCoord: { x: 369, y: 0 },
        image: document.getElementById("slimeTurretSprite"),
      },
      {
        price: 20,
        addTurret: (x, y) => {
          this.game.turrets.push(new Turret(this.game, x, y + this.height));
        },
        barCoord: { x: 498, y: 0 },
        image: document.getElementById("turretSprite"),
      },
      {
        price: 40,
        addTurret: (x, y) => {
          this.game.turrets.push(new FireTurret(this.game, x, y + this.height));
        },
        barCoord: { x: 627, y: 0 },
        image: document.getElementById("fireTurretSprite"),
      },
      {
        price: 60,
        addTurret: (x, y) => {
          this.game.turrets.push(
            new TeleportTurret(this.game, x, y + this.height)
          );
        },
        barCoord: { x: 756, y: 0 },
        image: document.getElementById("teleportTurretSprite"),
      },
    ];

    this.selectedTurret = null;
    this.image = document.getElementById("topBar");
    window.addEventListener("click", (e) => {
      if (this.selectedTurret) {
        const mouseClickX =
          e.pageX - (window.innerWidth / 2 - this.game.width / 2);
        const mouseClickY =
          e.pageY - (window.innerHeight / 2 - this.game.height / 2);
        turretPoints.forEach((turretPoint) => {
          if (
            checkRectangularCollision(
              mouseClickX,
              mouseClickY,
              turretSpaceWidth,
              turretSpaceWidth,
              turretPoint.x + turretSpaceWidth / 2,
              turretPoint.y + this.height + turretSpaceWidth / 2,
              turretSpaceWidth,
              turretSpaceWidth
            )
          ) {
            if (!turretPoint.filled) {
              turretPoint.filled = true;
              this.selectedTurret.addTurret(turretPoint.x, turretPoint.y);
              this.game.coins -= this.selectedTurret.price;
              this.selectedTurret = null;
            } else {
              this.game.turrets = this.game.turrets.filter(
                (turret) =>
                  !(
                    turret.x === turretPoint.x &&
                    turret.y === turretPoint.y + this.height
                  )
              );
              this.selectedTurret.addTurret(turretPoint.x, turretPoint.y);
              this.game.coins -= this.selectedTurret.price;
              this.selectedTurret = null;
            }
          }
        });
      }
    });
  }
  update(inputKeys) {
    if (
      inputKeys.includes("1") &&
      this.game.coins >= this.turretChoices[turretMap.SLIME].price
    ) {
      this.selectedTurret = this.turretChoices[turretMap.SLIME];
    } else if (
      inputKeys.includes("2") &&
      this.game.coins >= this.turretChoices[turretMap.BASIC].price
    ) {
      this.selectedTurret = this.turretChoices[turretMap.BASIC];
    } else if (
      inputKeys.includes("3") &&
      this.game.coins >= this.turretChoices[turretMap.FIRE].price
    ) {
      this.selectedTurret = this.turretChoices[turretMap.FIRE];
    } else if (
      inputKeys.includes("4") &&
      this.game.coins >= this.turretChoices[turretMap.TELEPORT].price
    ) {
      this.selectedTurret = this.turretChoices[turretMap.TELEPORT];
    }
  }
  draw(context) {
    this.turretChoices.forEach((turretChoice) => {
      if (this.game.coins >= turretChoice.price) {
        context.fillStyle = translucentGreen;
      } else {
        context.fillStyle = translucentRed;
      }
      context.fillRect(
        turretChoice.barCoord.x,
        turretChoice.barCoord.y,
        this.turretChoiceWidth,
        this.height
      );
    });
    if (this.selectedTurret) {
      context.fillStyle = translucentDarkGreen;
      context.fillRect(
        this.selectedTurret.barCoord.x,
        this.selectedTurret.barCoord.y,
        this.turretChoiceWidth,
        this.height
      );
      context.fillStyle = translucentRed;
      turretPoints.forEach((turretPoint) => {
        if (
          checkRectangularCollision(
            this.game.cursorX,
            this.game.cursorY,
            40,
            40,
            turretPoint.x + turretSpaceWidth / 2,
            turretPoint.y + this.height + turretSpaceWidth / 2,
            40,
            40
          )
        ) {
          if (turretPoint.filled) {
            context.fillStyle = translucentOrange;
          } else {
            context.fillStyle = translucentGreen;
          }
        }
      });
      context.fillRect(
        this.game.cursorX - turretSpaceWidth / 2,
        this.game.cursorY - turretSpaceWidth / 2,
        turretSpaceWidth,
        turretSpaceWidth
      );
      context.drawImage(
        this.selectedTurret.image,
        this.game.cursorX - turretSpaceWidth / 2,
        this.game.cursorY - turretSpaceWidth / 2,
        turretSpaceWidth,
        turretSpaceWidth
      );
    }
    context.drawImage(this.image, 0, 0, this.width, this.height);
    context.fillStyle = "red";
    context.font = "35px Arial";
    context.fillText(this.game.lives, 70, 36);
    context.fillStyle = "gold";
    context.font = "35px Arial";
    context.fillText(this.game.coins, 189, 36);
  }
}
