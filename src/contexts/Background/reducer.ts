import { CHANGE_BACKGROUND, CHANGE_COLORS, CHANGE_DIRECTION } from "./constants";
import { Action, Background } from "./types";

export function backgroundReducer(state: Background, action: Action) {
  const newBackground = { ...state };
  switch (action.type) {
    case CHANGE_COLORS: {
      newBackground.colors = action.payload;
      return newBackground;
    }
    case CHANGE_DIRECTION: {
      newBackground.direction = action.payload;
      return newBackground;
    }
    case CHANGE_BACKGROUND: {
      return action.payload;
    }
    default: {
      throw new Error(`Unhandled action at BackgroundReducer`);
    }
  }
}
