import { Grunt, Runner, Tank } from "./enemy.js";

const wave1 = {
  gruntCount: 8,
  runnerCount: 0,
  tankCount: 0,
};
const wave2 = {
  gruntCount: 15,
  runnerCount: 3,
  tankCount: 0,
};
const wave3 = {
  gruntCount: 20,
  runnerCount: 5,
  tankCount: 2,
};
const wave4 = {
  gruntCount: 30,
  runnerCount: 8,
  tankCount: 4,
};
const wave5 = {
  gruntCount: 40,
  runnerCount: 12,
  tankCount: 6,
};

const wave6 = {
  gruntCount: 50,
  runnerCount: 15,
  tankCount: 8,
};

const wave7 = {
  gruntCount: 50,
  runnerCount: 20,
  tankCount: 8,
};

const wave8 = {
  gruntCount: 50,
  runnerCount: 20,
  tankCount: 20,
};

const wave9 = {
  gruntCount: 70,
  runnerCount: 20,
  tankCount: 20,
};

const wave10 = {
  gruntCount: 100,
  runnerCount: 30,
  tankCount: 30,
};

export const waves = [
  wave1,
  wave2,
  wave3,
  wave4,
  wave5,
  wave6,
  wave7,
  wave8,
  wave9,
  wave10,
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
