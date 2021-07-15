import { Grid, GridItem } from "@chakra-ui/react";
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
import Header from "./components/Header";
import Foreground from "./containers/Foreground";
import Toolbox from "./containers/Toolbox";

const App = () => {
  const screenshotRef = React.useRef<HTMLDivElement>(null);

  return (
    <BackgroundProvider>
      <DeviceProvider>
        <ShadowProvider>
          <ImageProvider>
            <DimensionsProvider>
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
              <CookieNotice />
            </DimensionsProvider>
          </ImageProvider>
        </ShadowProvider>
      </DeviceProvider>
    </BackgroundProvider>
  );
};

export default React.memo(App);
