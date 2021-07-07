import { Image } from "@chakra-ui/react";
import BrowserWindow from "components/BrowserWindow";
import { DeviceContext } from "contexts/Device";
import { BezelOptions } from "contexts/Device/types";
import { ShadowContext } from "contexts/Shadow";
import React from "react";
import { generateShadow } from "utils/colors";
import { BEZEL, BROWSER } from "../../contexts/Device/constants";

const DeviceWrapper = ({ image }: { image: string }) => {
  const deviceContext = React.useContext(DeviceContext)!;
  const shadowContext = React.useContext(ShadowContext)!;
  const shadow = () => generateShadow(shadowContext.shadow);
  const [imageStyles, setimageStyles] = React.useState({});
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    switch (deviceContext.device.title) {
      case BEZEL:
        return setimageStyles({
          outline: `solid ${(deviceContext.device.options as BezelOptions).color} 10px`,
          borderRadius: "2rem",
        });
      default:
        return setimageStyles({});
    }
  }, [deviceContext.device]);

  return (
    <>
      {deviceContext.device.title === BROWSER && <BrowserWindow />}
      <Image maxW="100%" maxH="100%" ref={imageRef} boxShadow={shadow()} src={image} {...imageStyles} />
    </>
  );
};

export default DeviceWrapper;
