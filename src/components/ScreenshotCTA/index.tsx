import { Button } from "@chakra-ui/react";
import { useDimensions } from "contexts/Dimensions";
import { toPng } from "html-to-image";
import React from "react";
import { saveAs } from "utils/save";
import { DOWNLOAD_TEXT } from "./constants";

const ScreenshotCTA = ({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement> }) => {
  const dimensionsContext = useDimensions()!;

  const width = dimensionsContext.dimensions.resolution?.x!;
  const height = dimensionsContext.dimensions.resolution?.y!;

  const screenshot = () => {
    toPng(screenshotRef.current!, { pixelRatio: 1, canvasWidth: width, canvasHeight: height }).then((canvas) => {
      return saveAs(canvas, "mokkup.png");
    });
  };
  return (
    <Button aria-label="Download image" w="100%" onClick={screenshot} variant="outline" colorScheme="purple">
      <label htmlFor="donwload">{DOWNLOAD_TEXT}</label>
    </Button>
  );
};

export default ScreenshotCTA;
