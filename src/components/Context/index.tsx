import React, { createContext, useState } from "react";

type Background = {
  colors: string[];
  direction: string;
};

type SetupContextType = {
  background: Background;
  setBackground: (background: Background) => void;
  setBackgroundColors: (colors: string[]) => void;
  setDirection: (direction: string) => void;
};

export const SetupContext = createContext<SetupContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>({ colors: ["#cccccc", "#cccccc"], direction: "to-r" });

  const setBackgroundColors = (colors: string[]) => {
    const newBackground = { ...background };
    newBackground!.colors = colors;
    setBackground(newBackground!);
  };

  const setDirection = (direction: string) => {
    console.log(direction);
    const newBackground = { ...background };
    newBackground!.direction = direction;
    setBackground(newBackground!);
  };

  return <SetupContext.Provider value={{ background, setBackground, setBackgroundColors, setDirection }}>{children}</SetupContext.Provider>;
};
