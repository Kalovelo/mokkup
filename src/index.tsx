import { Box, ChakraProvider, ColorMode, ColorModeScript, extendTheme, Flex, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const App = React.lazy(() => import("./App"));

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
    <Flex bg={useColorModeValue("white", "gray.800")} w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box>
        <ClimbingBoxLoader css={override} color={useColorModeValue("#000", "#fff")} loading size={15} />
      </Box>
    </Flex>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
