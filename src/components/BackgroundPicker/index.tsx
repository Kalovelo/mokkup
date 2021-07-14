import { Box, Grid, Heading, IconButton } from "@chakra-ui/react";
import ColorPickWrapper from "containers/ColorPickWrapper";
import { useBackground } from "contexts/Background";
import { CHANGE_COLORS, CHANGE_DIRECTION } from "contexts/Background/constants";
import React from "react";
import { BiMinus, BiPlus, BiRotateLeft, BiRotateRight } from "react-icons/bi";
import PrebuiltPicker from "./PreBuiltPicker";
import { rotate } from "./utils";

const BackgroundPicker: React.FC = () => {
  const context = useBackground()!;
  const colors: string[] = context.background.colors;

  const removeColor = () => {
    let newColors: string[] = [...colors];
    newColors.pop();
    context.dispatch({ type: CHANGE_COLORS, payload: newColors });
  };

  const addColor = () => {
    context.dispatch({ type: CHANGE_COLORS, payload: [...colors!, "#CCCCCC"] });
  };

  return (
    <Grid gridGap="10">
      <Box display="flex" gridGap="6" alignItems="center">
        <Heading as="span" width="90px" fontSize="md" marginRight="auto">
          Options:
        </Heading>
        <IconButton borderRadius="50%" size="sm" aria-label="Remove color" icon={<BiMinus />} isDisabled={colors.length < 2} onClick={removeColor} />
        <IconButton borderRadius="50%" size="sm" aria-label="Add color" icon={<BiPlus />} isDisabled={colors.length > 3} onClick={addColor} />
      </Box>
      <ColorPickWrapper total={colors.length} />
      <PrebuiltPicker />
      <Box display="flex" gridGap="6" alignItems="center">
        <Heading as="span" width="90px" fontSize="md" justifySelf="flex-start" marginRight="auto">
          Direction:
        </Heading>
        <IconButton
          size="sm"
          borderRadius="50%"
          aria-label="Rotate gradients left"
          isDisabled={colors.length < 2}
          alignSelf="flex-end"
          icon={<BiRotateLeft />}
          onClick={() => context.dispatch({ type: CHANGE_DIRECTION, payload: rotate(context.background.direction, "left") })}
        />
        <IconButton
          size="sm"
          borderRadius="50%"
          aria-label="Rotate gradients right"
          isDisabled={colors.length < 2}
          justifySelf="flex-end"
          icon={<BiRotateRight />}
          onClick={() => context.dispatch({ type: CHANGE_DIRECTION, payload: rotate(context.background.direction, "right") })}
        />
      </Box>
    </Grid>
  );
};

export default BackgroundPicker;
