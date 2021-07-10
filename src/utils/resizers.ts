export const resolutionDivider = (width: number, height: number) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const max =
    windowWidth > windowHeight
      ? Math.max(width / (window.innerWidth / 2), height / (window.innerHeight / 1.5))
      : Math.max(width / (window.innerWidth / 1.3), height / (window.innerHeight / 2));
  return max > 1 ? max : 1;
};

export const scaleDivider = (width: number, height: number) => {
  const min = (1.3 * window.innerHeight) / (height * 1.5);
  return min < 1 ? min : 1;
};
