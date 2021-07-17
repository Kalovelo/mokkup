import {
  CHANGE_BLUR,
  CHANGE_COLOR,
  CHANGE_SPREAD,
  CHANGE_X,
  CHANGE_Y,
} from "./constants";
import { Action, Shadow } from "./types";

export function shadowReducer(state: Shadow, action: Action): Shadow {
  const newShadow: Shadow = { ...state };
  switch (action.type) {
    case CHANGE_X: {
      newShadow.x = action.payload;
      return newShadow;
    }
    case CHANGE_Y: {
      newShadow.y = action.payload;
      return newShadow;
    }
    case CHANGE_BLUR: {
      newShadow.blur = action.payload;
      return newShadow;
    }
    case CHANGE_SPREAD: {
      newShadow.spread = action.payload;
      return newShadow;
    }
    case CHANGE_COLOR: {
      newShadow.color = action.payload;
      return newShadow;
    }
    default: {
      throw new Error(`Unhandled action at DimensionsPicker`);
    }
  }
}
