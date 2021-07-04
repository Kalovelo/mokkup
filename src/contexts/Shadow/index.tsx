import React, { createContext, useState } from "react";

type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

type ShadowContextType = {
  shadow: Shadow;
  setShadow: (shadow: Shadow) => void;
};

export const ShadowContext = createContext<ShadowContextType | null>(null);

export const ShadowContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shadow, setShadow] = useState<Shadow>({ x: 0, y: 0, blur: 55, spread: 5, color: "#818181" });

  const providerProps = { shadow, setShadow };

  return <ShadowContext.Provider value={{ ...providerProps }}>{children}</ShadowContext.Provider>;
};
