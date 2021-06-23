import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import React from "react";
import BackgroundPicker from "../BackgroundPicker/BackgroundPicker";

const Toolbox = () => {
  const pickers = [
    {
      title: "Background",
      component: <BackgroundPicker />,
    },
  ];

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {pickers.map((picker, index) => (
        <AccordionItem key={index}>
          <AccordionButton>
            <Box fontWeight="bold" flex="1" textAlign="left">
              <h2>{picker.title}</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>{picker.component}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Toolbox;
