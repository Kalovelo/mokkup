import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { generateGradient } from "utils/colors";
import UiGradientsLogo from "./UiGradientsLogo";
import gradients from "static/gradients.json";
import { BackgroundContext } from "contexts/Background";

const PrebuiltPicker: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const context = useContext(BackgroundContext)!;

  const colorsPerPage: number = 32;
  const totalPages: number = Math.floor(gradients.length / colorsPerPage);

  const handlePick = (colors: string[]) => {
    onClose();
    context.setBackgroundColors(colors);
  };

  return (
    <>
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <UiGradientsLogo colorMode={colorMode} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="grid" gridGap="5">
            <Box display="flex" justifyContent="space-between" gridGap="10px"></Box>
            <Box display="grid" gridGap="5" justifyContent="center" gridTemplateColumns="repeat(auto-fill, 120px)">
              {gradients.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage).map((gradient, index) => (
                <Button
                  key={index}
                  onClick={() => handlePick(gradient.colors)}
                  display="flex"
                  flexDirection="column"
                  height="150px"
                  gridGap="3"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box boxShadow="2xl" width="50px" height="50px" borderRadius="50%" bgGradient={generateGradient(gradient.colors)}></Box>
                  <Box height="60px" display="flex" alignItems="center">
                    <span style={{ whiteSpace: "break-spaces" }}>{gradient.name}</span>
                  </Box>
                </Button>
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" gridGap="10px">
              <IconButton
                isDisabled={currentPage === 0}
                aria-label="Previous Gradient Page"
                onClick={() => setcurrentPage(currentPage - 1)}
                icon={<BiLeftArrow />}
              />
              <IconButton
                isDisabled={currentPage === totalPages}
                aria-label="Next Gradient Page"
                onClick={() => setcurrentPage(currentPage + 1)}
                icon={<BiRightArrow />}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button display="flex" onClick={onOpen} alignItems="center" gridGap="2">
        <UiGradientsLogo colorMode={colorMode} />
      </Button>
    </>
  );
};

export default PrebuiltPicker;