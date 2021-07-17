import { TWITTER_POST_SIZE } from "components/DimensionPicker/constants";
import React, { createContext } from "react";
import { dimensionsReducer } from "./reducer";
import { Action, Dimensions } from "./types";

type DimensionsContextType = {
  dimensions: Dimensions;
  dispatch: React.Dispatch<Action>;
};

const DimensionsContext = createContext<DimensionsContextType | undefined>(
  undefined
);

export const DimensionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const defaultDimensions: Dimensions = {
    scale: 1,
    resolution: TWITTER_POST_SIZE,
  };
  const [dimensions, dispatch] = React.useReducer(
    dimensionsReducer,
    defaultDimensions
  );

  const providerProps = { dimensions, dispatch };

  return (
    <DimensionsContext.Provider value={providerProps}>
      {children}
    </DimensionsContext.Provider>
  );
};

export function useDimensions(): DimensionsContextType {
  const context = React.useContext(DimensionsContext);
  if (context === undefined) {
    throw new Error("useDimensions must be used within DimensionsProvider");
  }

  return context;
}
