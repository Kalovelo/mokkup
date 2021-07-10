import React, { createContext } from "react";
import { dimensionsReducer } from "./reducer";
import { Action, Dimensions } from "./types";

type DimensionsContextType = {
  dimensions: Dimensions;
  dispatch: React.Dispatch<Action>;
};

const DimensionsContext = createContext<DimensionsContextType | null>(null);

export const DimensionsProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultDimensions: Dimensions = {
    scale: 1,
    resolution: {
      x: 1200,
      y: 650,
    },
  };
  const [dimensions, dispatch] = React.useReducer(dimensionsReducer, defaultDimensions);

  const providerProps = { dimensions, dispatch };

  return <DimensionsContext.Provider value={providerProps}>{children}</DimensionsContext.Provider>;
};

export function useDimensions() {
  const context = React.useContext(DimensionsContext);
  if (context === undefined) {
    throw new Error("useDimensions must be used within DimensionsProvider");
  }

  return context;
}
