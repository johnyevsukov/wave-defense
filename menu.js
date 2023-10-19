/**
 * @type { HTMLCanvasElement }
 */

/* render game menu (TODO: move all this to image) */

export class Menu {
  constructor(game) {
    this.game = game;
    this.width = 750;
    this.height = 440;
    this.isOpen = true;
    this.toggleMenu = this.debouncedMenuToggle();
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;
    this.textSpacing = 32;
    this.columnOneX = this.x + 15;
    this.columnTwoX = this.x + 290;
    this.textStartY = this.y + 35;
    this.movementTextStartY = 105;
    this.turretTextStartY = 250;
    this.otherTextStartY = 395;
    this.slimeTurretSprite = document.getElementById("slimeTurretSprite");
    this.basicTurretSprite = document.getElementById("turretSprite");
    this.fireTurretSprite = document.getElementById("fireTurretSprite");
    this.teleportTurretSprite = document.getElementById("teleportTurretSprite");
    this.turretSpriteWidth = 30;
    this.movementMappings = [
      "w - move up",
      "a - move left",
      "s - move down",
      "d - move right",
    ];
    this.turretMappings = [
      "1 - select slime turret",
      "2 - select basic turret",
      "3 - select fire turret",
      "4 - select teleport turret",
    ];
    this.turretMappings = [
      "1 - select slime turret",
      "2 - select basic turret",
      "3 - select fire turret",
      "4 - select teleport turret",
    ];
    this.otherMappings = [
      "r - restart game",
      "m - open / close menu",
      "click - fire / place turret",
    ];
    this.objectives = [
      "fire at enemies to destory them",
      "earn coins by destroying enemies",
      "purchase / place turrets for help",
      "don't let your lives reach 0",
      "survive all 15 waves of enemies",
    ];
    this.turretDescriptions = [
      "slime - slows enemies down",
      "basic - damages enemies",
      "fire - sets enemies on fire",
      "teleport - teleports enemies back",
    ];
  }
  debouncedMenuToggle() {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        this.isOpen = !this.isOpen;
      }, 50);
    };
  }
  update(inputKeys) {
    if (inputKeys.includes("m")) {
      this.toggleMenu();
    }
  }
  draw(context) {
    context.save();
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, this.game.width, this.game.height);

    context.lineWidth = 15;
    context.strokeStyle = "gray";
    context.strokeRect(this.x, this.y, this.width, this.height);

    context.fillStyle = "lightgray";
    context.fillRect(this.x, this.y, this.width, this.height);

    context.font = "32px Arial";
    context.fillStyle = "black";

    context.fillText("Controls:", this.columnOneX, this.textStartY);
    context.fillText("Objectives:", this.columnTwoX, this.textStartY);
    context.fillText("Turrets:", this.columnTwoX, this.textStartY + 225);

    context.font = "20px Arial";

    this.objectives.forEach((objective, i) => {
      context.fillText(
        `\u2022 ${objective}`,
        this.columnOneX + 280,
        this.movementTextStartY + this.textSpacing * i
      );
    });

    context.font = "20px Arial";

    this.movementMappings.forEach((mapping, i) => {
      context.fillText(
        mapping,
        this.columnOneX,
        this.movementTextStartY + this.textSpacing * i
      );
    });

    this.turretMappings.forEach((mapping, i) => {
      context.fillText(
        mapping,
        this.columnOneX,
        this.turretTextStartY + this.textSpacing * i
      );
    });

    this.otherMappings.forEach((mapping, i) => {
      context.fillText(
        mapping,
        this.columnOneX,
        this.otherTextStartY + this.textSpacing * i
      );
    });

    this.turretDescriptions.forEach((description, i) => {
      context.fillText(
        description,
        this.columnTwoX + 40,
        this.height - 111 + 41 * i
      );
    });

    context.drawImage(
      this.slimeTurretSprite,
      this.columnTwoX,
      this.height - 130,
      this.turretSpriteWidth,
      this.turretSpriteWidth
    );
    context.drawImage(
      this.basicTurretSprite,
      this.columnTwoX,
      this.height - 90,
      this.turretSpriteWidth,
      this.turretSpriteWidth
    );
    context.drawImage(
      this.fireTurretSprite,
      this.columnTwoX,
      this.height - 50,
      this.turretSpriteWidth,
      this.turretSpriteWidth
    );
    context.drawImage(
      this.teleportTurretSprite,
      this.columnTwoX,
      this.height - 10,
      this.turretSpriteWidth,
      this.turretSpriteWidth
    );
    context.restore();
  }
}
