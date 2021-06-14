import { Box, ChakraProvider, ColorMode, extendTheme, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
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

const theme = extendTheme({ config });

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Header />
      <Grid p="3" templateColumns={{ base: "1fr", md: "2fr 3fr" }}>
        <GridItem>
          <Toolbox />
        </GridItem>
        <GridItem>
          <Foreground />
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
);
