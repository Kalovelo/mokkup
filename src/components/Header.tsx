import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = () => {
  return (
    <Flex paddingBottom="10" justifyContent="space-between">
      <Heading fontFamily="poppins">mokkup</Heading>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
