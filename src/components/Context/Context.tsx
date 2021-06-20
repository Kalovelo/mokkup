import React, { createContext, useState } from "react";

type Background = { bgGradient: string } | { bgGradient: string };

type SetupContextType = {
  background: Background;
  setBackground: (background: Background) => void;
}

export const SetupContext = createContext<SetupContextType | null>(null);


export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>({
    bgGradient: "linear(to-t, green.200, pink.500)",
  });
  return <SetupContext.Provider value={{ background, setBackground }}>{children}</SetupContext.Provider>;
};
