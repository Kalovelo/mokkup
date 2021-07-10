const MOBILE_LIMIT = 700;

export const resolutionDivider = (width: number, height: number) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const isMobile = windowWidth < MOBILE_LIMIT;
  const max = isMobile
    ? Math.max(width / windowWidth, height / (windowHeight / 2))
    : Math.max(width / (windowWidth / 2), height / (windowHeight / 1.5));
  return max > 1 ? max : 1;
};

export const scaleDivider = (width: number, height: number) => {
  const windowHeight = window.innerHeight;
  const min = (1.3 * windowHeight) / (height * 1.5);
  return min < 1 ? min : 1;
};
