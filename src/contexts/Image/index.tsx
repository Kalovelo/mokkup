import React, { createContext, useState } from "react";

type ImageContextType = {
  image: string | null;
  setImage: (url: string) => void;
};

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<string | null>(null);

  const providerProps = { image, setImage };

  return <ImageContext.Provider value={{ ...providerProps }}>{children}</ImageContext.Provider>;
};
