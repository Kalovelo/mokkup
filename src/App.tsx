import { Box, ChakraProvider, ColorMode, extendTheme, Grid, GridItem } from "@chakra-ui/react";
import "@fontsource/manrope/400.css"; // Defaults to weight 400.
import "@fontsource/manrope/700.css"; // Defaults to weight 400.
import { BackgroundContextProvider } from "contexts/Background";
import { DeviceContextProvider } from "contexts/Device";
import { DimensionsContextProvider } from "contexts/Dimensions";
import { ImageContextProvider } from "contexts/Image";
import { ShadowContextProvider } from "contexts/Shadow";
import * as React from "react";
import Foreground from "./containers/Foreground";
import Header from "./components/Header";
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
  <BackgroundContextProvider>
    <DeviceContextProvider>
      <ShadowContextProvider>
        <ImageContextProvider>
          <DimensionsContextProvider>
            <ChakraProvider theme={theme}>
              <Box fontSize="xl">
                <Header />
                <Grid p="3" gap="6rem" justifyContent="center" templateColumns={{ base: "1fr", md: "450px 800px" }}>
                  <GridItem>
                    <Toolbox />
                  </GridItem>
                  <GridItem>
                    <Foreground />
                  </GridItem>
                </Grid>
              </Box>
            </ChakraProvider>
          </DimensionsContextProvider>
        </ImageContextProvider>
      </ShadowContextProvider>
    </DeviceContextProvider>
  </BackgroundContextProvider>
);
