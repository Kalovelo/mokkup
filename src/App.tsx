import * as React from "react";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, extendTheme, ColorMode, GridItem } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { Logo } from "./Logo";
import Header from "./components/Header";
import Foreground from "./components/Foreground";

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
        <GridItem></GridItem>
        <GridItem>
          <Foreground />
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
);
