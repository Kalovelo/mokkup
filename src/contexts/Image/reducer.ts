import { SET_IMAGE } from "./constants";
import { Action } from "./types";

export function imageReducer(state: string, action: Action): string {
  switch (action.type) {
    case SET_IMAGE: {
      return action.payload;
    }
    default: {
      throw new Error(`Unhandled action at ImagePicker`);
    }
  }
}
