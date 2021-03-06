export const getUploadedImageDimensions = (src: string): Promise<unknown> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        x: img.width,
        y: img.height,
      });
    img.src = src;
    img.remove();
  });
};
