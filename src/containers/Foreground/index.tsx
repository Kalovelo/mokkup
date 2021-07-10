import { Button, Flex, useMediaQuery } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import { useBackground } from "contexts/Background";
import { useDimensions } from "contexts/Dimensions";
import { useImage } from "contexts/Image";
import { toPng } from "html-to-image";
import React, { useRef } from "react";
import { generateGradient } from "utils/colors";
import { saveAs } from "utils/saveAs";
import { resolutionDivider } from "../../utils/resizers";

const Foreground = () => {
  const foregroundRef = useRef<HTMLDivElement>(null);

  const backgroundContext = useBackground()!;
  const imageContext = useImage()!;
  const dimensionsContext = useDimensions()!;

  const width = dimensionsContext.dimensions.resolution?.x!;
  const height = dimensionsContext.dimensions.resolution?.y!;

  // re-calculate image dimensions
  useMediaQuery("(max-width: 600px)");
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

  React.useEffect(() => {});

  return (
    <>
      <Button onClick={screenshot}>Open Modal</Button>
      <Flex
        m="0 auto"
        shadow="lg"
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
