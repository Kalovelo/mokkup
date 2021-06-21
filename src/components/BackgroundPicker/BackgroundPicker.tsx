import { Box, Button, Grid, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { SetupContext } from "components/Context/Context";
import React, { useContext, useState } from "react";
import { ChromePicker, Color, ColorResult, RGBColor } from "react-color";

const formatRGBA = (color: ColorResult | Color | string): string => {
  if ((color as ColorResult).rgb) {
    const { r, g, b, a } = (color as ColorResult).rgb;
    return `rgba(${r},${g},${b},${a})`;
  }
  if ((color as RGBColor).r) {
    const { r, g, b, a } = color as RGBColor;
    return `rgba(${r},${g},${b},${a})`;
  }
  return color as string;
};

const GradientPick = ({ index }: { index: number }) => {
  const context = useContext(SetupContext);
  const [color, setColor] = useState<string>(context?.background.colors[index]!);
  const [colorHex, setcolorHex] = useState<string>(context?.background.colors[index]!);

  const handleChange = (color: ColorResult) => {
    const formattedColor = formatRGBA(color);
    setColor(formattedColor);
    setcolorHex(color.hex);
    let colors = context?.background.colors!;
    colors[index] = formattedColor;
    context?.setBackground({ colors });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box display="flex" gridGap="2">
          <Button width="5" borderRadius="5" height="10" bg={colorHex} />
          {colorHex}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="max-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <ChromePicker color={color} onChange={handleChange} />
      </PopoverContent>
    </Popover>
  );
};

const GradientPickWrapper = ({ total }: { total: number }) => {
  return (
    <Grid templateColumns="1fr 1fr" flexWrap="wrap" marginY="5" justifyContent="center" gridGap="1rem">
      {Array(total)
        .fill(GradientPick)
        .map((GradientPick, index) => (
          <GradientPick key={index} index={index} />
        ))}
    </Grid>
  );
};

const BackgroundPicker = () => {
  const [colors, setGradientColors] = useState<string[]>(["#ccc", "#ccc"]);

  return (
    <Grid>
      <GradientPickWrapper total={colors.length} />
    </Grid>
  );
};

export default BackgroundPicker;
