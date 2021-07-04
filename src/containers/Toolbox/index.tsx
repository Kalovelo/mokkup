import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid } from "@chakra-ui/react";
import ImagePicker from "components/ImagePicker";
import ShadowPicker from "components/ShadowPicker";
import React from "react";
import BackgroundPicker from "../../components/BackgroundPicker";

type Picker = {
  title: string;
  component: JSX.Element;
};
const Toolbox = () => {
  const pickers: Picker[] = [
    {
      title: "Background",
      component: <BackgroundPicker />,
    },
    {
      title: "Shadow",
      component: <ShadowPicker />,
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
    </Grid>
  );
};

export default Toolbox;
