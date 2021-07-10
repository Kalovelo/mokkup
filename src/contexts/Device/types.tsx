import {
  BEZEL,
  NONE,
  BROWSER,
  CHANGE_TYPE,
  TOGGLE_BURGER,
  TOGGLE_DARK_MODE,
  TOGGLE_URL_BAR,
  TOGGLE_STEALTH_BUTTONS,
  CHANGE_URL,
  CHANGE_BEZEL_COLOR,
} from "./constants";

export type BrowserOptions = {
  isDark: boolean;
  isStealth: boolean;
  isBarHidden: boolean;
  isBurgerHidden: boolean;
  url?: string;
};

export type BezelOptions = {
  color: string;
};

export type Device = {
  title: typeof BROWSER | typeof BEZEL | typeof NONE;
  options?: BrowserOptions | BezelOptions;
};

export type DeviceContextType = {
  device: Device;
  setDevice: (device: Device) => void;
};

export type Action =
  | {
      type: typeof CHANGE_TYPE;
      payload: Device;
    }
  | {
      type: typeof TOGGLE_BURGER;
    }
  | {
      type: typeof TOGGLE_DARK_MODE;
    }
  | {
      type: typeof TOGGLE_URL_BAR;
    }
  | {
      type: typeof TOGGLE_STEALTH_BUTTONS;
    }
  | {
      type: typeof CHANGE_URL;
      payload: string;
    }
  | {
      type: typeof CHANGE_BEZEL_COLOR;
      payload: string;
    };
