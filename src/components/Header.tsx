import { Grid } from "@chakra-ui/layout";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = () => {
  return (
    <Grid p="2">
      <ColorModeSwitcher />
    </Grid>
  );
};

export default Header;
