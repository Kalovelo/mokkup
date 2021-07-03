import React, { createContext, useState } from "react";

type Background = {
  colors: string[];
  direction: string;
};

type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

type SetupContextType = {
  background: Background;
  setBackground: (background: Background) => void;
  setBackgroundColors: (colors: string[]) => void;
  setDirection: (direction: string) => void;
  image: string | null;
  setImage: (url: string) => void;
  shadow: Shadow;
  setShadow: (shadow: Shadow) => void;
};

export const SetupContext = createContext<SetupContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>({ colors: ["#cccccc", "#cccccc"], direction: "to-r" });
  const [image, setImage] = useState<string | null>(null);
  const [shadow, setShadow] = useState<Shadow>({ x: 0, y: 0, blur: 55, spread: 5, color: "#818181" });

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

  const providerProps = { background, setBackground, setBackgroundColors, setDirection, image, setImage, shadow, setShadow };

  return <SetupContext.Provider value={{ ...providerProps }}>{children}</SetupContext.Provider>;
};
