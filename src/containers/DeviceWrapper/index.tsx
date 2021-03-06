import BrowserWindow from "components/BrowserWindow";
import { useDevice } from "contexts/Device";
import { BezelOptions } from "contexts/Device/types";
import { useShadow } from "contexts/Shadow";
import React from "react";
import { generateShadow } from "utils/colors";
import { BEZEL, BROWSER } from "../../contexts/Device/constants";

const DeviceWrapper = ({ image }: { image: string }): JSX.Element => {
  const deviceContext = useDevice();
  const { x, y, blur, spread, color } = useShadow().shadow;
  const shadow = () => generateShadow(x, y, blur, spread, color);
  const [imageStyles, setimageStyles] = React.useState({});
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    switch (deviceContext.device.title) {
      case BEZEL:
        return setimageStyles({
          border: `solid ${
            (deviceContext.device.options as BezelOptions).color
          } 10px`,
          borderRadius: "2rem",
        });
      default:
        return setimageStyles({});
    }
  }, [deviceContext.device]);

  return (
    <>
      {deviceContext.device.title === BROWSER && <BrowserWindow />}
      <img
        width="100%"
        height="100%"
        alt="End result preview"
        style={{
          boxShadow: shadow(),
          maxWidth: "100%",
          maxHeight: "100%",
          ...imageStyles,
        }}
        ref={imageRef}
        src={image}
      />
    </>
  );
};

export default DeviceWrapper;
