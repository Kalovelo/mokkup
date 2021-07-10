import { Button } from "@chakra-ui/react";
import { useDimensions } from "contexts/Dimensions";
import { toPng } from "html-to-image";
import React from "react";
import { saveAs } from "utils/saveAs";
import { DOWNLOAD_TEXT } from "./constants";

const ScreenshotCTA = ({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement> }) => {
  const dimensionsContext = useDimensions()!;

  const width = dimensionsContext.dimensions.resolution?.x!;
  const height = dimensionsContext.dimensions.resolution?.y!;

  const screenshot = () => {
    toPng(screenshotRef.current!, { pixelRatio: 1, canvasWidth: width, canvasHeight: height }).then((canvas) => {
      return saveAs(canvas, "mokkup.jpg");
    });
  };
  return (
    <Button w="100%" onClick={screenshot} variant="outline" colorScheme="purple">
      <label htmlFor="upload">{DOWNLOAD_TEXT}</label>
    </Button>
  );
};

export default ScreenshotCTA;
