import { Flex } from "@chakra-ui/layout";
import { Box, Link, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Kalovelogo from "components/Kalovelogo";
import React from "react";

const Footer = () => (
  <Flex fontSize="md" marginTop="70px" gridGap="2" justifyContent="center" alignSelf="flex-end" justifySelf="flex-end" w="100%">
    <Link
      color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
      _hover={{
        textDecor: "none",
        color: useColorModeValue("blackAlpha.900", "whiteAlpha.900"),
      }}
      css={css`
        :hover * {
          transition: all 0.5s;
          fill: ${useColorModeValue("#000", "#fff")};
        }
      `}
      alignItems="center"
      gridGap="2"
      display="flex"
      href="https://kalovelo.com"
      target="_blank"
      rel="noopener"
    >
      crafted by
      <Box w="5">
        <Kalovelogo />
      </Box>
      Kalovelo
    </Link>
  </Flex>
);

export default Footer;
