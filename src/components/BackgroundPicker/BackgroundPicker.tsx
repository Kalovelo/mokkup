import { Grid, Icon } from "@chakra-ui/react";
import React from "react";
import StackRadioGroup from "../StackRadioGroup/StackRadioGroup";
import { CgEditFade } from "react-icons/cg";
import { GiPlainCircle, GiCircle } from "react-icons/gi";

const BackgroundPicker = () => {
  const RadioGroups = [
    {
      name: "Background",
      options: [
        {
          value: "Solid",
          label: <Icon as={GiPlainCircle} />,
        },
        {
          value: "Gradient",
          label: <Icon as={CgEditFade} />,
        },
        {
          value: "Transparent",
          label: <Icon as={GiCircle} />,
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

export default BackgroundPicker;
