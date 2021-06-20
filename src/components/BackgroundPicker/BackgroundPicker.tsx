import { Box, Grid, Icon } from "@chakra-ui/react";
import { SetupContext } from "components/Context/Context";
import React, { useContext, useState } from "react";
import { SketchPicker, ColorResult, Color, RGBColor } from "react-color";
import { CgEditFade } from "react-icons/cg";
import { GiPlainCircle } from "react-icons/gi";
import StackRadioGroup from "../StackRadioGroup/StackRadioGroup";

const formatRGBA = (color: ColorResult | Color) => {
  let { r, g, b, a } = (color as ColorResult).rgb ? (color as ColorResult).rgb : (color as RGBColor);
  return `rgba(${r},${g},${b},${a})`;
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
  const defaultValue = RadioGroup.options[0].value;

  const context = useContext(SetupContext);
  const [solidColor, setSolidColor] = useState<Color>("ccc");

  const handleSolidChange = (color: ColorResult) => {
    setSolidColor(color.rgb);
    context?.setBackground({ colors: [formatRGBA(color)] });
  };

  const handleTypeChange = (type: string) => {
    switch (type) {
      case "Solid":
        return context?.setBackground({ colors: [formatRGBA(solidColor)] });
      case "Gradient":
        return context?.setBackground({ colors: [] });
    }
  };

  return (
    <Grid>
      <StackRadioGroup defaultValue={defaultValue} {...RadioGroup} callback={handleTypeChange} />
      <Box marginTop="20">
        <SketchPicker presetColors={[]} color={solidColor} onChange={handleSolidChange} />
      </Box>
    </Grid>
  );
};

export default BackgroundPicker;
