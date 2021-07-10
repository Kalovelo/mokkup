import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid } from "@chakra-ui/react";
import BackgroundPicker from "components/BackgroundPicker";
import DevicePicker from "components/DevicePicker";
import DimensionPicker from "components/DimensionPicker";
import ImagePicker from "components/ImagePicker";
import ShadowPicker from "components/ShadowPicker";
import React from "react";
import { BACKGROUND_TITLE, DEVICE_TITLE, DIMENSIONS_TITLE, SHADOW_TITLE } from "./constants";

type Picker = {
  title: string;
  component: JSX.Element;
};
const Toolbox = () => {
  const pickers: Picker[] = [
    {
      title: BACKGROUND_TITLE,
      component: <BackgroundPicker />,
    },
    {
      title: SHADOW_TITLE,
      component: <ShadowPicker />,
    },
    {
      title: DIMENSIONS_TITLE,
      component: <DimensionPicker />,
    },
    {
      title: DEVICE_TITLE,
      component: <DevicePicker />,
    },
  ];

  return (
    <Grid gridGap="5">
      <ImagePicker />
      <Accordion defaultIndex={[0]} allowMultiple>
        {pickers.map((picker, index) => (
          <AccordionItem key={index}>
            <AccordionButton fontSize="1rem">
              <Box flex="1" textAlign="left">
                <h2>{picker.title}</h2>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>{picker.component}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <ImagePicker />
    </Grid>
  );
};

export default Toolbox;
