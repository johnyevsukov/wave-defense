/**
 * @type { HTMLCanvasElement }
 */

/* enemy wave data / supporting functions */

import { Grunt, Runner, Tank } from "./enemy.js";
import { playSfx } from "./utils.js";

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
    gruntCount: 80,
    runnerCount: 30,
    tankCount: 20,
  },
];

const nextWaveSfx = new Audio();
nextWaveSfx.src = "sfx/next-wave.wav";

export const addWaveEnemies = (game, wave) => {
  if (wave.runnerCount > 0) {
    playSfx(nextWaveSfx);
  }
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
  context.translate(game.width - 75, game.height / 2 - 68);
  context.rotate(Math.PI / 2);
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.font = "32px 'Press Start 2P'";
  context.fillText(`Wave ${game.currentWaveIndex + 1}`, 0, 0);
  context.restore();
};
