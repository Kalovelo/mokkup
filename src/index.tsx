import { Box, ColorModeScript, Flex } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const App = React.lazy(() => import("./App"));

const Loading = () => (
  <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
    <Box>
      <ClimbingBoxLoader loading size={15} />
    </Box>
  </Flex>
);
ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <React.Suspense fallback={<Loading />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
