import { Directions } from "contexts/Background/types";

const directions: Directions = ["to-t", "to-tr", "to-r", "to-br", "to-b", "to-bl", "to-l", "to-tl"];

export const rotate = (lastValue: Directions[number], direction: string) => {
  const currentDirection = lastValue;
  const index = directions.indexOf(currentDirection);
  if (direction === "right") {
    if (index === directions.length - 1) return directions[0];
    return directions[index + 1];
  } else {
    if (index === 0) return directions[directions.length - 1];
    return directions[index - 1];
  }
};
