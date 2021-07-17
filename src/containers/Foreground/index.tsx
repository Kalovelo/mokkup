import { Flex, useMediaQuery } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import { useBackground } from "contexts/Background";
import { useDimensions } from "contexts/Dimensions";
import { useImage } from "contexts/Image";
import React from "react";
import { generateGradient } from "utils/colors";
import { resolutionDivider } from "../../utils/resizers";

const Foreground = ({
  screenshotRef,
}: {
  screenshotRef: React.RefObject<HTMLDivElement>;
}): JSX.Element => {
  const backgroundContext = useBackground();
  const imageContext = useImage();
  const dimensionsContext = useDimensions();

  const width: number = dimensionsContext.dimensions.resolution.x;
  const height: number = dimensionsContext.dimensions.resolution.y;

  // re-calculate image dimensions
  useMediaQuery("(max-width: 600px)");
  const imageDimensions = {
    w: `${width / resolutionDivider(width, height)}px`,
    h: `${height / resolutionDivider(width, height)}px`,
  };

  const { colors, direction } =
    backgroundContext && backgroundContext.background;
  const image = imageContext.image;
  const imageScale = dimensionsContext.dimensions.scale;

  const background = () => {
    if (colors.length === 0) return { bg: "transparent" };
    if (colors.length === 1) return { bg: colors[0] };
    const gradient = generateGradient(colors, direction);
    return gradient && { bgGradient: gradient };
  };

  return (
    <Flex
      flexDirection="column"
      position="sticky"
      top="20"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        data-testid="foregroundWrapper"
        shadow="lg"
        ref={screenshotRef}
        {...imageDimensions}
        transition="all .2s"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        {...background()}
      >
        <Flex
          data-testid="foreground"
          flexDir="column"
          transform={`scale(${imageScale})`}
        >
          <DeviceWrapper image={image} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Foreground;
