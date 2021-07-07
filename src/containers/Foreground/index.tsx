import { Button, Flex } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import { BackgroundContext } from "contexts/Background";
import { DimensionsContext } from "contexts/Dimensions";
import { ImageContext } from "contexts/Image";
import { toPng } from "html-to-image";
import React, { useContext, useRef } from "react";
import { generateGradient } from "utils/colors";
import { saveAs } from "utils/saveAs";
import { resolutionDivider } from "../../utils/resizers";

const Foreground = () => {
  const foregroundRef = useRef<HTMLDivElement>(null);

  const backgroundContext = useContext(BackgroundContext)!;
  const imageContext = useContext(ImageContext)!;
  const dimensionsContext = useContext(DimensionsContext)!;

  const width = dimensionsContext.dimensions.resolution?.x!;
  const height = dimensionsContext.dimensions.resolution?.y!;

  const imageDimensions = {
    w: `${width / resolutionDivider(width, height)}px`,
    h: `${height / resolutionDivider(height, height)}px`,
  };

  const { colors, direction } = backgroundContext.background;
  const image = imageContext.image;
  const imageScale = dimensionsContext.dimensions.scale;

  const background = () => {
    if (colors.length === 0) return { bg: "transparent" };
    if (colors.length === 1) return { bg: colors[0] };
    return { bgGradient: generateGradient(colors, direction) };
  };

  const screenshot = () => {
    toPng(foregroundRef.current!, { pixelRatio: resolutionDivider(height, height) }).then((canvas) => {
      return saveAs(canvas, "mokkup.jpg");
    });
  };

  return (
    <>
      <Button onClick={screenshot}>Open Modal</Button>
      <Flex
        ref={foregroundRef}
        {...imageDimensions}
        transition="all .2s"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        {...background()}
      >
        <Flex flexDir="column" transform={`scale(${imageScale})`}>
          <DeviceWrapper image={image!} />
        </Flex>
      </Flex>
    </>
  );
};

export default Foreground;
