/**
 * @type { HTMLCanvasElement }
 */

/* enemy wave data / supporting functions */

import { Grunt, Runner, Tank } from "./enemy.js";

export const waves = [
  {
    gruntCount: 8,
    runnerCount: 0,
    tankCount: 0,
  },
  {
    gruntCount: 15,
    runnerCount: 3,
    tankCount: 0,
  },
  {
    gruntCount: 20,
    runnerCount: 5,
    tankCount: 2,
  },
  {
    gruntCount: 30,
    runnerCount: 8,
    tankCount: 4,
  },
  {
    gruntCount: 40,
    runnerCount: 12,
    tankCount: 6,
  },
  {
    gruntCount: 50,
    runnerCount: 15,
    tankCount: 8,
  },
  {
    gruntCount: 50,
    runnerCount: 20,
    tankCount: 8,
  },
  {
    gruntCount: 50,
    runnerCount: 20,
    tankCount: 20,
  },
  {
    gruntCount: 70,
    runnerCount: 20,
    tankCount: 20,
  },
  {
    gruntCount: 100,
    runnerCount: 30,
    tankCount: 30,
  },
  {
    gruntCount: 100,
    runnerCount: 50,
    tankCount: 30,
  },
  {
    gruntCount: 120,
    runnerCount: 50,
    tankCount: 30,
  },
  {
    gruntCount: 130,
    runnerCount: 60,
    tankCount: 30,
  },
  {
    gruntCount: 130,
    runnerCount: 60,
    tankCount: 30,
  },
  {
    gruntCount: 140,
    runnerCount: 70,
    tankCount: 80,
  },
];

export const addWaveEnemies = (game, wave) => {
  for (let i = 0; i < wave.gruntCount; i++) {
    game.enemies.push(new Grunt(game));
  }
  for (let i = 0; i < wave.runnerCount; i++) {
    game.enemies.push(new Runner(game));
  }
  for (let i = 0; i < wave.tankCount; i++) {
    game.enemies.push(new Tank(game));
  }
};

export const drawWaveText = (game, context) => {
  context.save();
  context.translate(game.width - 75, game.height / 2 - 65);
  context.rotate(Math.PI / 2);
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.font = "48px Arial";
  context.fillText(`Wave ${game.currentWaveIndex + 1}`, 0, 0);
  context.restore();
};
