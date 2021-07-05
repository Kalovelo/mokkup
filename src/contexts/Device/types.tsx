import { BROWSER_TITLE_TYPE, BEZEL_TITLE_TYPE, NONE_TITLE_TYPE } from "./constants";

export type BrowserOptions = {
  isDark: boolean;
  isStealth: boolean;
  isBarHidden: boolean;
  isToggleHidden: boolean;
};

export type BezelOptions = {
  color: string;
};

export type Device = {
  title: BROWSER_TITLE_TYPE | BEZEL_TITLE_TYPE | NONE_TITLE_TYPE;
  options?: BrowserOptions | BezelOptions;
};
