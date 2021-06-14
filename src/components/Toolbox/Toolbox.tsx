import { Grid, Icon } from "@chakra-ui/react";
import React from "react";
import StackRadioGroup from "../StackRadioGroup/StackRadioGroup";
import { CgEditFade } from "react-icons/cg";

const Toolbox = () => {
  const RadioGroups = [
    {
      name: "Background",
      options: [
        {
          value: "reacto",
          label: <Icon as={CgEditFade} />,
        },
      ],
    },
  ];

  return (
    <Grid>
      {RadioGroups.map((group) => (
        <StackRadioGroup {...group} />
      ))}
    </Grid>
  );
};

export default Toolbox;
