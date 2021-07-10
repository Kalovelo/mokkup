import { Box, ChakraProvider, ColorMode, extendTheme, Grid, GridItem } from "@chakra-ui/react";
import "@fontsource/manrope/400.css"; // Defaults to weight 400.
import "@fontsource/manrope/700.css"; // Defaults to weight 400.
import { BackgroundProvider } from "contexts/Background";
import { DeviceProvider } from "contexts/Device";
import { DimensionsProvider } from "contexts/Dimensions";
import { ImageProvider } from "contexts/Image";
import { ShadowProvider } from "contexts/Shadow";
import * as React from "react";
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

export const App = () => (
  <BackgroundProvider>
    <DeviceProvider>
      <ShadowProvider>
        <ImageProvider>
          <DimensionsProvider>
            <ChakraProvider theme={theme}>
              <Box fontSize="xl">
                <Header />
                <Grid p="3" gap="6rem" justifyContent="center" templateColumns={{ base: "1fr", lg: "1fr 1fr", xl: "450px 800px" }}>
                  <GridItem>
                    <Toolbox />
                  </GridItem>
                  <GridItem>
                    <Foreground />
                  </GridItem>
                </Grid>
              </Box>
            </ChakraProvider>
          </DimensionsProvider>
        </ImageProvider>
      </ShadowProvider>
    </DeviceProvider>
  </BackgroundProvider>
);
