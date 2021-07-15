import { Box, ChakraProvider, ColorMode, extendTheme, Flex, Grid, GridItem } from "@chakra-ui/react";
import Footer from "components/Footer";
import ImagePicker from "components/ImagePicker";
import ScreenshotCTA from "components/ScreenshotCTA";
import { BackgroundProvider } from "contexts/Background";
import { DeviceProvider } from "contexts/Device";
import { DimensionsProvider } from "contexts/Dimensions";
import { ImageProvider } from "contexts/Image";
import { ShadowProvider } from "contexts/Shadow";
import React from "react";
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

const App = () => {
  const screenshotRef = React.useRef<HTMLDivElement>(null);

  return (
    <BackgroundProvider>
      <DeviceProvider>
        <ShadowProvider>
          <ImageProvider>
            <DimensionsProvider>
              <ChakraProvider theme={theme}>
                <Grid gridTemplateRows="min-content" minH="100vh" p={{ base: 3, md: "7" }} fontSize="xl">
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
              </ChakraProvider>
            </DimensionsProvider>
          </ImageProvider>
        </ShadowProvider>
      </DeviceProvider>
    </BackgroundProvider>
  );
};

export default App;
