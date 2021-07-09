import React, { createContext, useState } from "react";
import defaultImage from "static/defaultImage.png";
type ImageContextType = {
  image: string | null;
  setImage: (url: string) => void;
};

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<string | null>(defaultImage);

  const providerProps = { image, setImage };

  return <ImageContext.Provider value={{ ...providerProps }}>{children}</ImageContext.Provider>;
};
