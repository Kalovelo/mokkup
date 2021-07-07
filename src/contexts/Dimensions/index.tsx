import React, { createContext, useState } from "react";

type Dimensions = {
  scale: number;
  resolution?: {
    x: number;
    y: number;
  };
};

type DimensionsContextType = {
  dimensions: Dimensions;
  setDimensions: (dimensions: Dimensions) => void;
};

export const DimensionsContext = createContext<DimensionsContextType | null>(null);

export const DimensionsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultDimensions: Dimensions = {
    scale: 1,
    resolution: {
      x: 1200,
      y: 650,
    },
  };
  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);

  const providerProps = { dimensions, setDimensions };

  return <DimensionsContext.Provider value={{ ...providerProps }}>{children}</DimensionsContext.Provider>;
};
