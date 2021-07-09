export const resolutionDivider = (width: number, height: number) => {
  const max = Math.max(width / (window.innerWidth / 2), height / (window.innerHeight / 1.5));
  return max > 1 ? max : 1;
};

export const scaleDivider = (width: number, height: number) => {
  const max = 1.3 * Math.min(window.innerWidth / width, window.innerHeight / (height * 1.5));
  return max < 1 ? max : 1;
};
