import React, { createContext } from "react";
import defaultImage from "static/defaultImage.png";
import { imageReducer } from "./reducer";
import { Action } from "./types";

type ImageContextType = {
  image: string;
  dispatch: React.Dispatch<Action>;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [image, dispatch] = React.useReducer(imageReducer, defaultImage);

  const providerProps = { image, dispatch };

  return (
    <ImageContext.Provider value={providerProps}>
      {children}
    </ImageContext.Provider>
  );
};

export function useImage(): ImageContextType {
  const context = React.useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within ImageProvider");
  }

  return context;
}
