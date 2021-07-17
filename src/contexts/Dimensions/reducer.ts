import {
  CHANGE_HEIGHT,
  CHANGE_RESOLUTION,
  CHANGE_SCALE,
  CHANGE_WIDTH,
} from "./constants";
import { Action, Dimensions } from "./types";

export function dimensionsReducer(
  state: Dimensions,
  action: Action
): Dimensions {
  const newDimensions: Dimensions = { ...state };
  switch (action.type) {
    case CHANGE_RESOLUTION: {
      newDimensions.resolution = action.payload;
      return newDimensions;
    }
    case CHANGE_WIDTH: {
      newDimensions.resolution.x = action.payload;
      return newDimensions;
    }
    case CHANGE_HEIGHT: {
      newDimensions.resolution.y = action.payload;
      return newDimensions;
    }
    case CHANGE_SCALE: {
      newDimensions.scale = action.payload;
      return newDimensions;
    }
    default: {
      throw new Error(`Unhandled action at DimensionsPicker`);
    }
  }
}
