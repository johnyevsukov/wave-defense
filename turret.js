/**
 * @type { HTMLCanvasElement }
 */

import { checkRectangularCollision } from "./utils.js";

class Shot {
  constructor(game, turret, dx, dy) {
    this.game = game;
    this.width = 8;
    this.height = 8;
    this.boundaries = {
      top: this.game.topBar.height,
      bottom: this.game.height - this.height,
      left: 0,
      right: this.game.width - this.width,
    };
    this.x = turret.x + turret.width / 2 - this.width / 2;
    this.y = turret.y + turret.height / 2 - this.height / 2;
    this.dx = dx;
    this.dy = dy;
    this.damage = 20;
    this.speed = 20;
    this.color = "black";
    this.markedForDeletion = false;
  }
  hit(enemy) {
    enemy.health -= this.damage;
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
        this.hit(enemy);
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
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Turret {
  constructor(game, x, y) {
    this.game = game;
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.shots = [];
    this.fireTime = 1;
    this.fireTimeIncrement = 0.02;
    this.fireTimer = 0;
    this.sfx = new Audio();
    this.sfx.src = "sfx/basic-turret-shot.wav";
    this.image = document.getElementById("turretSprite");
  }
  findClosestEnemy() {
    const enemyXCors = this.game.enemies.map((enemy) => {
      return enemy.x;
    });
    const closestXCor = Math.min(...enemyXCors);
    const closestEnemy = this.game.enemies.filter(
      (enemy) => enemy.x === closestXCor
    )[0];
    return closestEnemy;
  }
  getShotTrajectory(enemy) {
    const x = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
    const y = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
    const l = Math.sqrt(x * x + y * y);

    const dx = x / l;
    const dy = y / l;

    return { dx, dy };
  }
  shoot(enemy) {
    this.sfx.play();
    const trajectory = this.getShotTrajectory(enemy);
    this.shots.push(new Shot(this.game, this, trajectory.dx, trajectory.dy));
  }
  update(deltaTimeMultiplier) {
    const closestEnemy = this.findClosestEnemy();
    const tragetPoint = closestEnemy || {
      x: this.x + this.width,
      y: this.y,
    };
    this.rotation = Math.atan2(
      tragetPoint.x - this.x,
      -(tragetPoint.y - this.y)
    );
    if (this.fireTimer < this.fireTime) {
      this.fireTimer += this.fireTimeIncrement * deltaTimeMultiplier;
    } else if (
      this.fireTimer >= this.fireTime &&
      closestEnemy &&
      closestEnemy.x <= this.game.width - closestEnemy.width / 2
    ) {
      this.shoot(closestEnemy);
      this.fireTimer = 0;
    }
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
    this.shots.forEach((shot) => {
      shot.draw(context);
    });
  }
}

class SlimeShot extends Shot {
  constructor(game, turret, dx, dy) {
    super(game, turret, dx, dy);
    this.speed = 25;
    this.color = "lightGreen";
  }
  hit(enemy) {
    enemy.color = "lightGreen";
    if (enemy.speed > 0.3) {
      enemy.speed -= 0.1;
    } else {
      enemy.speed = 0.3;
    }
  }
}

export class SlimeTurret extends Turret {
  constructor(game, x, y) {
    super(game, x, y);
    this.sfx.src = "sfx/slime-turret-shot.wav";
    this.image = document.getElementById("slimeTurretSprite");
  }
  shoot(enemy) {
    this.sfx.play();
    const trajectory = this.getShotTrajectory(enemy);
    this.shots.push(
      new SlimeShot(this.game, this, trajectory.dx, trajectory.dy)
    );
  }
}

class FireShot extends Shot {
  constructor(game, turret, dx, dy) {
    super(game, turret, dx, dy);
    this.damage = 5;
    this.color = "orange";
  }
  hit(enemy) {
    enemy.health == this.damage;
    enemy.burnRate += 0.2;
  }
}

export class FireTurret extends Turret {
  constructor(game, x, y) {
    super(game, x, y);
    this.sfx.src = "sfx/fire-turret-shot.wav";
    this.image = document.getElementById("fireTurretSprite");
  }
  shoot(enemy) {
    this.sfx.play();
    const trajectory = this.getShotTrajectory(enemy);
    this.shots.push(
      new FireShot(this.game, this, trajectory.dx, trajectory.dy)
    );
  }
}

class TeleportShot extends Shot {
  constructor(game, turret, dx, dy) {
    super(game, turret, dx, dy);
    this.speed = 10;
    this.color = "lightBlue";
  }
  hit(enemy) {
    enemy.x += 250;
  }
}

export class TeleportTurret extends Turret {
  constructor(game, x, y) {
    super(game, x, y);
    this.sfx.src = "sfx/teleport-turret-shot.wav";
    this.image = document.getElementById("teleportTurretSprite");
  }
  shoot(enemy) {
    this.sfx.play();
    const trajectory = this.getShotTrajectory(enemy);
    this.shots.push(
      new TeleportShot(this.game, this, trajectory.dx, trajectory.dy)
    );
  }
}
