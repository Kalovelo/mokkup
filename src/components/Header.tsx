import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = (): JSX.Element => {
  return (
    <Flex paddingBottom="10" justifyContent="space-between">
      <Heading as="h1" fontFamily="poppins">
        mokkup
      </Heading>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
