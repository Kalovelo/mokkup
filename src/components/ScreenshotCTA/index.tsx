import { Button } from "@chakra-ui/react";
import { useDimensions } from "contexts/Dimensions";
import { toPng } from "html-to-image";
import React from "react";
import { saveAs } from "utils/save";
import { DOWNLOAD_TEXT } from "./constants";

type ScreenshotCTAProps = {
  screenshotRef: React.RefObject<HTMLDivElement>;
};

const ScreenshotCTA = ({ screenshotRef }: ScreenshotCTAProps): JSX.Element => {
  const dimensionsContext = useDimensions();

  const width: number = dimensionsContext.dimensions.resolution?.x || 0;
  const height: number = dimensionsContext.dimensions.resolution?.y || 0;

  const screenshot = () => {
    if (screenshotRef.current)
      toPng(screenshotRef.current, {
        pixelRatio: 1,
        canvasWidth: width,
        canvasHeight: height,
      }).then((canvas) => {
        return saveAs(canvas, "mokkup.png");
      });
  };
  return (
    <Button
      aria-label="Download image"
      w="100%"
      onClick={screenshot}
      variant="outline"
      colorScheme="purple"
    >
      <label htmlFor="donwload">{DOWNLOAD_TEXT}</label>
    </Button>
  );
};

export default ScreenshotCTA;
