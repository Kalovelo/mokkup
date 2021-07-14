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
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useBackground } from "contexts/Background";
import { CHANGE_COLORS } from "contexts/Background/constants";
import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import gradients from "static/gradients.json";
import { generateGradient } from "utils/colors";
import UiGradientsLogo from "./UiGradientsLogo";

const PrebuiltPicker: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const context = useBackground()!;

  const colorsPerPage: number = useBreakpointValue({ base: 6, md: 16, lg: 32 })!;
  const totalPages: number = Math.floor(gradients.length / colorsPerPage);

  function handlePick(colors: string[]) {
    onClose();
    context.dispatch({ type: CHANGE_COLORS, payload: colors });
  }

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
            <Box
              display="grid"
              gridGap="5"
              justifyContent="center"
              gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr", lg: "repeat(auto-fill, 120px)" }}
            >
              {gradients.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage).map((gradient, index) => (
                <Button
                  key={index}
                  onClick={() => handlePick(gradient.colors)}
                  display="flex"
                  flexDirection="column"
                  height={{ base: "100px", lg: "150px" }}
                  gridGap="3"
                  justifyContent="center"
                  alignItems="center"
                  aria-label={`Choose ${gradient.name} gradient`}
                >
                  <Box
                    boxShadow="2xl"
                    width={{ base: "30px", md: "50px" }}
                    height={{ base: "30px", md: "50px" }}
                    borderRadius="50%"
                    bgGradient={generateGradient(gradient.colors)!}
                  ></Box>
                  <Box height={{ base: "30px", md: "60px" }} display="flex" alignItems="center">
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
      <Button aria-label={`Open prebuilt uiGradients`} display="flex" onClick={onOpen} alignItems="center" gridGap="2">
        <UiGradientsLogo colorMode={colorMode} />
      </Button>
    </>
  );
};

export default PrebuiltPicker;
