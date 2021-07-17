import {
  CHANGE_COLORS,
  CHANGE_DIRECTION,
  CHANGE_BACKGROUND,
} from "./constants";

export type Directions = [
  "to-t",
  "to-tr",
  "to-r",
  "to-br",
  "to-b",
  "to-bl",
  "to-l",
  "to-tl"
];

export type XWays = ["left", "right"];

export type Background = {
  colors: string[];
  direction: Directions[number];
};

export type Action =
  | {
      payload: string[];
      type: typeof CHANGE_COLORS;
    }
  | {
      payload: Directions[number];
      type: typeof CHANGE_DIRECTION;
    }
  | { payload: Background; type: typeof CHANGE_BACKGROUND };
