import {
  CHANGE_HEIGHT,
  CHANGE_RESOLUTION,
  CHANGE_SCALE,
  CHANGE_WIDTH,
} from "./constants";

export type Dimensions = {
  scale: number;
  resolution: {
    x: number;
    y: number;
  };
};

export type Action =
  | {
      type: typeof CHANGE_RESOLUTION;
      payload: { x: number; y: number };
    }
  | {
      type: typeof CHANGE_WIDTH;
      payload: number;
    }
  | {
      type: typeof CHANGE_HEIGHT;
      payload: number;
    }
  | {
      type: typeof CHANGE_SCALE;
      payload: number;
    };
