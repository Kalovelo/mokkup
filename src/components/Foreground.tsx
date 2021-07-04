import { Flex } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import { BackgroundContext } from "contexts/Background";
import { ImageContext } from "contexts/Image";
import html2canvas from "html2canvas";
import React, { useContext, useRef } from "react";
import { generateGradient } from "utils/colors";

const Foreground = () => {
  const foregroundRef = useRef(null);

  const backgroundContext = useContext(BackgroundContext)!;
  const imageContext = useContext(ImageContext)!;
  const { colors, direction } = backgroundContext.background;

  const image = imageContext.image;

  const background = () => {
    if (colors.length === 0) return { bg: "transparent" };
    if (colors.length === 1) return { bg: colors[0] };
    return { bgGradient: generateGradient(colors, direction) };
  };

  const saveAs = (uri: string, filename: string) => {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  const clickHandler = () => {
    html2canvas(foregroundRef.current!, { allowTaint: true }).then((canvas) => {
      saveAs(canvas.toDataURL(), "mokkup-ui.jpg");
    });
  };

  return (
    <Flex overflow="hidden" ref={foregroundRef} onClick={clickHandler} justifyContent="center" flexDirection="column" {...background()} p="10%">
      <DeviceWrapper image={image!} />
    </Flex>
  );
};

export default Foreground;
