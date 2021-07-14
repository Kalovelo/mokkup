import { Directions, XWays } from "contexts/Background/types";

const directions: Directions = ["to-t", "to-tr", "to-r", "to-br", "to-b", "to-bl", "to-l", "to-tl"];
export const rotate = (lastValue: Directions[number], direction: XWays[number]) => {
  const currentDirection = lastValue;
  const index = directions.indexOf(currentDirection);
  switch (direction) {
    case "right":
      if (index === directions.length - 1) return directions[0];
      return directions[index + 1];
    case "left":
      if (index === 0) return directions[directions.length - 1];
      return directions[index - 1];
    default:
      throw new Error(`Wrong parameters: lastValue: ${lastValue}, direction:${direction}`);
  }
};
