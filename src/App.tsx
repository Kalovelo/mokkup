import { Box, ChakraProvider, ColorMode, ColorModeScript, extendTheme, Fade, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import CookieNotice from "components/CookieNotice";
import Footer from "components/Footer";
import ImagePicker from "components/ImagePicker";
import ScreenshotCTA from "components/ScreenshotCTA";
import { BackgroundProvider } from "contexts/Background";
import { DeviceProvider } from "contexts/Device";
import { DimensionsProvider } from "contexts/Dimensions";
import { ImageProvider } from "contexts/Image";
import { ShadowProvider } from "contexts/Shadow";
import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import Header from "./components/Header";
import Foreground from "./containers/Foreground";
import Toolbox from "./containers/Toolbox";

export interface ChakraConfig {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
}

const config: ChakraConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Manrope",
    body: "Manrope",
  },
});

const Loading = () => {
  const override = css`
    background: transparent !important;
  `;
  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
      <ClimbingBoxLoader css={override} color={useColorModeValue("#000", "#fff")} loading size={15} />
    </Box>
  );
};

const App = () => {
  const [showLoader, setShowLoader] = React.useState(true);
  const screenshotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => setShowLoader(false), 1000);
  }, []);

  return (
    <>
      <ColorModeScript />
      <BackgroundProvider>
        <DeviceProvider>
          <ShadowProvider>
            <ImageProvider>
              <DimensionsProvider>
                <ChakraProvider theme={theme}>
                  <Fade unmountOnExit in={showLoader}>
                    <Loading />
                  </Fade>
                  <Grid display={showLoader ? "none" : "grid"} gridTemplateRows="min-content" minH="100vh" p={{ base: 3, md: "7" }} fontSize="xl">
                    <Header />
                    <Grid gap="6rem" justifyContent="center" templateColumns={{ base: "1fr", lg: "1fr 1fr", xl: "450px 1fr" }}>
                      <GridItem display="grid" gridGap="2">
                        <ImagePicker />
                        <Toolbox />
                        <ScreenshotCTA screenshotRef={screenshotRef} />
                      </GridItem>
                      <GridItem>
                        <Foreground screenshotRef={screenshotRef} />
                      </GridItem>
                    </Grid>
                    <Footer />
                  </Grid>
                  <CookieNotice />
                </ChakraProvider>
              </DimensionsProvider>
            </ImageProvider>
          </ShadowProvider>
        </DeviceProvider>
      </BackgroundProvider>
    </>
  );
};

export default React.memo(App);
