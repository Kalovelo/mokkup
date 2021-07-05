import React, { createContext, useState } from "react";
import { NONE } from "./constants";
import { Device } from "./types";

type DeviceContextType = {
  device: Device;
  setDevice: (device: Device) => void;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultState = {
    title: NONE,
  };

  const [device, setDevice] = useState<Device>(defaultState);

  const providerProps = { device, setDevice };

  return <DeviceContext.Provider value={{ ...providerProps }}>{children}</DeviceContext.Provider>;
};
