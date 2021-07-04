import { Grid } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { BackgroundContext } from "contexts/Background";
import React, { useContext } from "react";
import { ColorResult } from "react-color";
import { formatRGBA } from "utils/colors";

type ColorPickWrapperProps = {
  total: number;
};

const ColorPickWrapper: React.FC<ColorPickWrapperProps> = ({ total }) => {
  const context = useContext(BackgroundContext)!;

  const handleChange = (color: ColorResult, index: number): void => {
    let formattedColor = formatRGBA(color);
    let newColors = [...context.background.colors];
    newColors[index] = formattedColor;
    context?.setBackgroundColors(newColors);
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

export default ColorPickWrapper;
