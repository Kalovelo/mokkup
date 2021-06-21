import { Box, Button, Grid, HStack, Icon, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { SetupContext } from "components/Context/Context";
import React, { useContext, useState } from "react";
import { ChromePicker, Color, ColorResult, RGBColor } from "react-color";
import { CgEditFade } from "react-icons/cg";
import { GiPlainCircle } from "react-icons/gi";
import StackRadioGroup from "../StackRadioGroup/StackRadioGroup";

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

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    let colors = context?.background.colors!;
    colors[index] = color.hex;
    context?.setBackground({ colors });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box display="flex" gridGap="2">
          <Button width="5" borderRadius="5" height="10" bg={color} />
          {color}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="max-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <ChromePicker disableAlpha color={color} onChange={handleChange} />
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
  const RadioGroup = {
    name: "Background",
    options: [
      {
        value: "Solid",
        label: <Icon display="flex" alignItems="center" as={GiPlainCircle} />,
      },
      {
        value: "Gradient",
        label: <Icon display="flex" alignItems="center" as={CgEditFade} />,
      },
    ],
  };

  const context = useContext(SetupContext);
  const [backgroundType, setBackgroundType] = useState<string>(RadioGroup.options[0].value);
  const [colors, setGradientColors] = useState<string[]>(["#ccc", "#fff", "#fff", "#fff"]);

  const handleSolidChange = (color: ColorResult) => {
    colors.shift();
    colors.unshift(color.hex);
    setGradientColors(colors!);
    context?.setBackground({ colors: [formatRGBA(color)] });
  };

  const handleTypeChange = (type: string) => {
    switch (type) {
      case "Solid":
        setGradientColors(context?.background.colors!);
        setBackgroundType("Solid");
        return context?.setBackground({ colors: [formatRGBA(context?.background.colors[0])] });
      case "Gradient":
        setBackgroundType("Gradient");
        return context?.setBackground({ colors });
    }
  };

  return (
    <Grid>
      <StackRadioGroup defaultValue={backgroundType} {...RadioGroup} callback={handleTypeChange} />
      {backgroundType === "Solid" && (
        <Box margin="20px auto">
          <ChromePicker color={context?.background.colors[0]} onChange={handleSolidChange} />
        </Box>
      )}
      {backgroundType === "Gradient" && <GradientPickWrapper total={colors.length} />}
    </Grid>
  );
};

export default BackgroundPicker;
