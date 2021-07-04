import { BROWSER_TYPE, MOBILE_TYPE, NONE, NONE_TYPE } from "containers/DeviceWrapper/constants";
import React, { createContext, useState } from "react";

type Device = BROWSER_TYPE | MOBILE_TYPE | NONE_TYPE;

type DeviceContextType = {
  device: Device;
  setDevice: (device: Device) => void;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState<Device>(NONE);

  const providerProps = { device, setDevice };

  return <DeviceContext.Provider value={{ ...providerProps }}>{children}</DeviceContext.Provider>;
};
