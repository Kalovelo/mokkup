import React, { createContext, useState } from "react";

type Background = {
  colors: string[];
  direction: string;
};

type BackgroundContextType = {
  background: Background;
  setBackground: (background: Background) => void;
  setBackgroundColors: (colors: string[]) => void;
  setDirection: (direction: string) => void;
};

export const BackgroundContext = createContext<BackgroundContextType | null>(null);

type BackgroundContextProviderType = {
  children: React.ReactNode;
};
export const BackgroundContextProvider: React.FC<BackgroundContextProviderType> = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>({ colors: ["#cccccc", "#cccccc"], direction: "to-r" });

  const setBackgroundColors = (colors: string[]) => {
    const newBackground = { ...background };
    newBackground!.colors = colors;
    setBackground(newBackground!);
  };

  const setDirection = (direction: string) => {
    const newBackground = { ...background };
    newBackground!.direction = direction;
    setBackground(newBackground!);
  };

  const providerProps = { background, setBackground, setBackgroundColors, setDirection };

  return <BackgroundContext.Provider value={{ ...providerProps }}>{children}</BackgroundContext.Provider>;
};
