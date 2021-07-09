import React, { createContext, useState } from "react";
import { BROWSER, NONE } from "./constants";
import { Device } from "./types";

type DeviceContextType = {
  device: Device;
  setDevice: (device: Device) => void;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultState: Device = {
    title: BROWSER,
    options: {
      isDark: true,
      isStealth: true,
      isBarHidden: false,
      isToggleHidden: false,
      url: "https://kalovelo.com",
    },
  };

  const [device, setDevice] = useState<Device>(defaultState);

  const providerProps = { device, setDevice };

  return <DeviceContext.Provider value={{ ...providerProps }}>{children}</DeviceContext.Provider>;
};
