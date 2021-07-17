import React, { createContext } from "react";
import { shadowReducer } from "./reducer";
import { Action, Shadow } from "./types";

type ShadowContextType = {
  shadow: Shadow;
  dispatch: React.Dispatch<Action>;
};

const ShadowContext = createContext<ShadowContextType | undefined>(undefined);

export const ShadowProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [shadow, dispatch] = React.useReducer(shadowReducer, {
    x: 0,
    y: 0,
    blur: 55,
    spread: 5,
    color: "#545252",
  });

  const providerProps = { shadow, dispatch };

  return (
    <ShadowContext.Provider value={providerProps}>
      {children}
    </ShadowContext.Provider>
  );
};

export function useShadow(): ShadowContextType {
  const context = React.useContext(ShadowContext);
  if (context === undefined) {
    throw new Error("useShadow must be used within ShadowProvider");
  }

  return context;
}
