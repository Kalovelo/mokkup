import { Box, Grid, Heading, IconButton } from "@chakra-ui/react";
import ColorPickWrapper from "containers/ColorPickWrapper";
import React, { useContext } from "react";
import { BiMinus, BiPlus, BiRotateLeft, BiRotateRight } from "react-icons/bi";
import PrebuiltPicker from "./PreBuiltPicker";
import { BackgroundContext } from "contexts/Background";

const directions: string[] = ["to-t", "to-tr", "to-r", "to-br", "to-b", "to-bl", "to-l", "to-tl"];

const BackgroundPicker: React.FC = () => {
  const context = useContext(BackgroundContext)!;
  const colors: string[] = context.background.colors;

  const removeColor = () => {
    let newColors: string[] = [...colors];
    newColors.pop();
    context?.setBackgroundColors(newColors);
  };

  const addColor = () => {
    context?.setBackgroundColors([...colors!, "#cccccc"]);
  };

  const rotate = (direction: string) => {
    const currentDirection = context.background.direction;
    const index = directions.indexOf(currentDirection);
    if (direction === "right") {
      if (index === directions.length - 1) return context.setDirection(directions[0]);
      context.setDirection(directions[index + 1]);
    } else {
      if (index === 0) return context.setDirection(directions[directions.length - 1]);
      context.setDirection(directions[index - 1]);
    }
  };

  return (
    <Grid gridGap="10">
      <Box display="flex" gridGap="6" alignItems="center">
        <Heading as="h6" width="80px" fontSize="md" marginRight="auto">
          Options:
        </Heading>
        <IconButton borderRadius="50%" size="sm" aria-label="Remove color" icon={<BiMinus />} isDisabled={colors.length < 2} onClick={removeColor} />
        <IconButton borderRadius="50%" size="sm" aria-label="Add color" icon={<BiPlus />} isDisabled={colors.length > 3} onClick={addColor} />
      </Box>
      <ColorPickWrapper total={colors.length} />
      <PrebuiltPicker />
      <Box display="flex" gridGap="6" alignItems="center">
        <Heading as="h6" width="80px" fontSize="md" justifySelf="flex-start" marginRight="auto">
          Direction:
        </Heading>
        <IconButton
          size="sm"
          borderRadius="50%"
          aria-label="Rotate gradients left"
          isDisabled={colors.length < 2}
          alignSelf="flex-end"
          icon={<BiRotateLeft />}
          onClick={() => rotate("left")}
        />
        <IconButton
          size="sm"
          borderRadius="50%"
          aria-label="Rotate gradients right"
          isDisabled={colors.length < 2}
          justifySelf="flex-end"
          icon={<BiRotateRight />}
          onClick={() => rotate("right")}
        />
      </Box>
    </Grid>
  );
};

export default BackgroundPicker;
