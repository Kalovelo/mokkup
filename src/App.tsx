import { Box, ChakraProvider, ColorMode, extendTheme, Grid, GridItem } from "@chakra-ui/react";
import "@fontsource/manrope/400.css"; // Defaults to weight 400.
import "@fontsource/manrope/700.css"; // Defaults to weight 400.
import * as React from "react";
import { ContextProvider } from "./components/Context";
import Foreground from "./components/Foreground";
import Header from "./components/Header";
import Toolbox from "./components/Toolbox/Toolbox";

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
  <ContextProvider>
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Header />
        <Grid p="3" gap="6rem" justifyContent="center" templateColumns={{ base: "1fr", md: "350px 800px" }}>
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
