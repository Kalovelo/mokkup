import React, { createContext } from "react";
import defaultImage from "static/defaultImage.png";
import { imageReducer } from "./reducer";
import { Action } from "./types";

type ImageContextType = {
  image: string | null;
  dispatch: React.Dispatch<Action>;
};

const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, dispatch] = React.useReducer(imageReducer, defaultImage);

  const providerProps = { image, dispatch };

  return <ImageContext.Provider value={providerProps}>{children}</ImageContext.Provider>;
};

export function useImage() {
  const context = React.useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within ImageProvider");
  }

  return context;
}
