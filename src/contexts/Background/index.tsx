import React, { createContext } from "react";
import { backgroundReducer } from "./reducer";
import { Background, Action } from "./types";

type BackgroundContextType = {
  background: Background;
  dispatch: React.Dispatch<Action>;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

type BackgroundProviderType = {
  children: React.ReactNode;
};
export const BackgroundProvider: React.FC<BackgroundProviderType> = ({ children }: { children: React.ReactNode }) => {
  const [background, dispatch] = React.useReducer(backgroundReducer, { colors: ["#536976", "#292E49"], direction: "to-r" });

  const providerProps = { background, dispatch };

  return <BackgroundContext.Provider value={providerProps}>{children}</BackgroundContext.Provider>;
};

export function useBackground() {
  const context = React.useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }

  return context;
}
