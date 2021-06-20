import React, { createContext, useState } from "react";

type Background = {
  colors: string[];
  direction?: string;
};

type SetupContextType = {
  background: Background;
  setBackground: (background: Background) => void;
};

export const SetupContext = createContext<SetupContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>({ colors: ["#ccc"] });

  return <SetupContext.Provider value={{ background, setBackground }}>{children}</SetupContext.Provider>;
};
