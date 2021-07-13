import React, { createContext } from "react";
import { BROWSER } from "./constants";
import { deviceReducer } from "./reducer";
import { Action, Device } from "./types";

type DeviceContextType = {
  device: Device;
  dispatch: React.Dispatch<Action>;
};
const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultState: Device = {
    title: BROWSER,
    options: {
      isDark: true,
      isStealth: true,
      isBarHidden: false,
      isBurgerHidden: false,
      url: "https://totally-not-a-coolors-knock-off.com",
    },
  };

  const [device, dispatch] = React.useReducer(deviceReducer, defaultState);

  const providerProps = { device, dispatch };

  return <DeviceContext.Provider value={providerProps}>{children}</DeviceContext.Provider>;
};

export function useDevice() {
  const context = React.useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }

  return context;
}
