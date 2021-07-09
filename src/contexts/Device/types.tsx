import { BEZEL, NONE, BROWSER } from "./constants";

export type BrowserOptions = {
  isDark: boolean;
  isStealth: boolean;
  isBarHidden: boolean;
  isToggleHidden: boolean;
  url?: string;
};

export type BezelOptions = {
  color: string;
};

export type Device = {
  title: typeof BROWSER | typeof BEZEL | typeof NONE;
  options?: BrowserOptions | BezelOptions;
};
