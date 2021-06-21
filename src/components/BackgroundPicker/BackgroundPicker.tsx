import { Box, Grid, Icon, Popover } from "@chakra-ui/react";
import { SetupContext } from "components/Context/Context";
import React, { useContext, useState } from "react";
import { ChromePicker, ColorResult, Color, RGBColor } from "react-color";
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

  const handleSolidChange = (color: ColorResult) => {
    context?.setBackground({ colors: [formatRGBA(color)] });
  };

  const handleTypeChange = (type: string) => {
    switch (type) {
      case "Solid":
        setBackgroundType("Solid");
        return context?.setBackground({ colors: [formatRGBA(context?.background.colors[0])] });
      case "Gradient":
        setBackgroundType("Gradient");
        return context?.setBackground({ colors: ["#ccc"] });
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
    </Grid>
  );
};

export default BackgroundPicker;
