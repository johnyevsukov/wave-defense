export const generateRandomWholeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomDecimalNumber = (min, max) => {
  const diff = max - min;
  return Math.random() * diff + min;
};

export const checkRectangularCollision = (
  x1,
  y1,
  width1,
  height1,
  x2,
  y2,
  width2,
  height2
) => {
  return !(
    y1 + height1 < y2 ||
    y1 > y2 + height2 ||
    x1 + width1 < x2 ||
    x1 > x2 + width2
  );
};
