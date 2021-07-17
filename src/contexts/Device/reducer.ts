import {
  CHANGE_BEZEL_COLOR,
  CHANGE_TYPE,
  CHANGE_URL,
  TOGGLE_BURGER,
  TOGGLE_DARK_MODE,
  TOGGLE_STEALTH_BUTTONS,
  TOGGLE_URL_BAR,
} from "./constants";
import { Action, BezelOptions, BrowserOptions, Device } from "./types";

export function deviceReducer(state: Device, action: Action): Device {
  const newDevice: Device = { ...state };
  switch (action.type) {
    case CHANGE_TYPE: {
      return action.payload;
    }
    case TOGGLE_BURGER: {
      (newDevice.options as BrowserOptions).isBurgerHidden = !(
        state.options as BrowserOptions
      ).isBurgerHidden;
      return newDevice;
    }
    case TOGGLE_DARK_MODE: {
      (newDevice.options as BrowserOptions).isDark = !(
        state.options as BrowserOptions
      ).isDark;
      return newDevice;
    }
    case TOGGLE_STEALTH_BUTTONS: {
      (newDevice.options as BrowserOptions).isStealth = !(
        state.options as BrowserOptions
      ).isStealth;
      return newDevice;
    }
    case TOGGLE_URL_BAR: {
      (newDevice.options as BrowserOptions).isBarHidden = !(
        state.options as BrowserOptions
      ).isBarHidden;
      return newDevice;
    }
    case CHANGE_URL: {
      (newDevice.options as BrowserOptions).url = action.payload;
      return newDevice;
    }
    case CHANGE_BEZEL_COLOR: {
      (newDevice.options as BezelOptions).color = action.payload;
      return newDevice;
    }
    default: {
      throw new Error(`Unhandled action at DeviceReducer`);
    }
  }
}
