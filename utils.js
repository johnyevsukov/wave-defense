export const generateRandomWholeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomDecimalNumber = (min, max) => {
  const diff = max - min;
  return Math.random() * diff + min;
};
