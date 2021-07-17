import {
  CHANGE_BLUR,
  CHANGE_COLOR,
  CHANGE_SPREAD,
  CHANGE_X,
  CHANGE_Y,
} from "./constants";

export type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

export type Action =
  | {
      type: typeof CHANGE_X;
      payload: number;
    }
  | {
      type: typeof CHANGE_Y;
      payload: number;
    }
  | {
      type: typeof CHANGE_BLUR;
      payload: number;
    }
  | {
      type: typeof CHANGE_SPREAD;
      payload: number;
    }
  | {
      type: typeof CHANGE_COLOR;
      payload: string;
    };
