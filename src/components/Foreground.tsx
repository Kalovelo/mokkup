import { Flex } from "@chakra-ui/react";
import DeviceWrapper from "containers/DeviceWrapper";
import html2canvas from "html2canvas";
import React, { useContext, useRef } from "react";
import { generateGradient } from "utils/colors";
import { SetupContext } from "../Context";

const Foreground = () => {
  const foregroundRef = useRef(null);

  const context = useContext(SetupContext)!;
  const { colors, direction } = context.background;

  const image = context.image;

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
