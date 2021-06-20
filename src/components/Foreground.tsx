import { Flex, Image } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { useContext } from "react";
import BrowserWindow from "./BrowserWindow/BrowserWindow";
import { SetupContext } from "./Context/Context";

const Foreground = () => {
  const foregroundRef = useRef(null);

  const context = useContext(SetupContext);

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
    html2canvas(foregroundRef.current!).then(function (canvas) {
      saveAs(canvas.toDataURL(), "mokkup-ui.jpg");
    });
  };

  return (
    <Flex
      ref={foregroundRef}
      // onClick={clickHandler}
      justifyContent="center"
      flexDirection="column"
      {...context?.background}
      p="10%"
    >
      <BrowserWindow />
      <Image w="100" src="../../test.jpg" />
    </Flex>
  );
};

export default Foreground;