import { Button, Flex } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import { BackgroundContext } from "contexts/Background";
import { DimensionsContext } from "contexts/Dimensions";
import { ImageContext } from "contexts/Image";
import { toPng } from "html-to-image";
import React, { useContext, useRef } from "react";
import { generateGradient } from "utils/colors";
import { saveAs } from "utils/saveAs";

const Foreground = () => {
  const foregroundRef = useRef<HTMLDivElement>(null);

  const backgroundContext = useContext(BackgroundContext)!;
  const imageContext = useContext(ImageContext)!;
  const dimensionsContext = useContext(DimensionsContext)!;

  const [imageStyles, setimageStyles] = React.useState<{ w?: string; h?: string }>({});

  const { colors, direction } = backgroundContext.background;
  const image = imageContext.image;
  const imageScale = dimensionsContext.dimensions.scale;
  const resolutionDivider = 1.2;

  React.useEffect(() => {
    const width = dimensionsContext.dimensions.resolution?.x!;
    const height = dimensionsContext.dimensions.resolution?.y!;

    const getUploadedImageDimensions = () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve({
            w: `${img.width / resolutionDivider}px`,
            h: `${img.height / resolutionDivider}px`,
          });
        img.src = imageContext.image!;
      });
    };

    const resetImageDimensions = async () =>
      width && height
        ? setimageStyles({
            w: width > 800 || height > 500 ? `${width / resolutionDivider}px` : `${width}px`,
            h: width > 800 || height > 500 ? `${height / resolutionDivider}px` : `${height}px`,
          })
        : setimageStyles((await getUploadedImageDimensions()) as { w?: string; h?: string });

    resetImageDimensions();
  }, [dimensionsContext.dimensions.resolution?.x, dimensionsContext.dimensions.resolution?.y, imageContext.image]);

  const background = () => {
    if (colors.length === 0) return { bg: "transparent" };
    if (colors.length === 1) return { bg: colors[0] };
    return { bgGradient: generateGradient(colors, direction) };
  };

  const screenshot = () => {
    toPng(foregroundRef.current!, { pixelRatio: resolutionDivider }).then((canvas) => {
      return saveAs(canvas, "mokkup.jpg");
    });
  };

  return (
    <>
      <Button onClick={screenshot}>Open Modal</Button>
      <Flex
        ref={foregroundRef}
        {...imageStyles}
        transition="all .2s"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        {...background()}
        p="10%"
      >
        <Flex flexDir="column" transform={`scale(${imageScale})`}>
          <DeviceWrapper image={image!} />
        </Flex>
      </Flex>
    </>
  );
};

export default Foreground;
