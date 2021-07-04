import React from "react";
import { generateShadow } from "utils/colors";
import { Box, Image } from "@chakra-ui/react";
import { SetupContext } from "Context";
import { BROWSER, MOBILE } from "./constants";
import BrowserWindow from "components/BrowserWindow";

const DeviceWrapper = ({ image }: { image: string }) => {
  const context = React.useContext(SetupContext)!;
  const shadow = () => generateShadow(context.shadow);
  const [imageStyles, setimageStyles] = React.useState({});

  React.useEffect(() => {
    switch (context.device) {
      case MOBILE:
        return setimageStyles({ border: "solid #111 20px", borderRadius: "2rem" });
      default:
        return setimageStyles({});
    }
  }, [context.device]);

  return (
    <Box style={{ boxShadow: shadow() }} borderRadius="2rem">
      {context.device === BROWSER && <BrowserWindow />}
      <Image src={image} width="100%" {...imageStyles} />
    </Box>
  );
};

export default DeviceWrapper;
