import { Box, ChakraProvider, ColorMode, extendTheme, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import Foreground from "./components/Foreground";
import Header from "./components/Header";
import Toolbox from "./components/Toolbox/Toolbox";
import "@fontsource/manrope/700.css"; // Defaults to weight 400.
import "@fontsource/manrope/400.css"; // Defaults to weight 400.
import { ContextProvider } from "./components/Context/Context";

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
    body: "Manrope",
  },
});

export const App = () => (
  <ContextProvider>
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Header />
        <Grid p="3" gap="6rem" templateColumns={{ base: "1fr", md: "1fr 3fr" }}>
          <GridItem>
            <Toolbox />
          </GridItem>
          <GridItem>
            <Foreground />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  </ContextProvider>
);
