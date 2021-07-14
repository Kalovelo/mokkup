import { Grid } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { useBackground } from "contexts/Background";
import { CHANGE_COLORS } from "contexts/Background/constants";
import React from "react";
import { ColorResult } from "react-color";
import { formatRGBA } from "utils/colors";

type ColorPickWrapperProps = {
  total: number;
};

const ColorPickWrapper: React.FC<ColorPickWrapperProps> = ({ total }) => {
  const context = useBackground()!;

  const handleChange = (color: ColorResult, index: number): void => {
    let formattedColor = formatRGBA(color);
    let newColors = [...context.background.colors];
    newColors[index] = formattedColor;
    context.dispatch({ type: CHANGE_COLORS, payload: newColors });
  };

  return (
    <Grid templateColumns="1fr 1fr" flexWrap="wrap" justifyContent="center" gridGap="1rem">
      {Array(total)
        .fill(ColorPicker)
        .map((ColorPicker, index) => (
          <ColorPicker
            color={[...context.background.colors][index]}
            key={index}
            index={index}
            callback={(color: ColorResult) => handleChange(color, index)}
          />
        ))}
    </Grid>
  );
};

export default React.memo(ColorPickWrapper);
