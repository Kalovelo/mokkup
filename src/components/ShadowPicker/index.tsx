import { Grid, GridItem, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Text, Tooltip } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { ShadowContext } from "contexts/Shadow";
import React from "react";
import { ColorResult } from "react-color";
import { formatRGBA } from "utils/colors";
import { parseNumberInput } from "utils/validation";

type gridItem = {
  label: string;
  callback: (val: number) => void;
  tooltip: string;
  value: number;
};

const ShadowPicker: React.FC = () => {
  const context = React.useContext(ShadowContext)!;

  const changeColor = (color: ColorResult): void => {
    const formattedColor = formatRGBA(color);
    const newShadow = { ...context.shadow };
    newShadow.color = formattedColor;
    context.setShadow(newShadow);
  };

  const changeX = (x: number) => {
    const newShadow = { ...context.shadow };
    newShadow.x = x;
    context.setShadow(newShadow);
  };
  const changeY = (y: number) => {
    const newShadow = { ...context.shadow };
    newShadow.y = y;
    context.setShadow(newShadow);
  };
  const changeBlur = (blur: number) => {
    const newShadow = { ...context.shadow };
    newShadow.blur = blur;
    context.setShadow(newShadow);
  };
  const changeSpread = (spread: number) => {
    const newShadow = { ...context.shadow };
    newShadow.spread = spread;
    context.setShadow(newShadow);
  };

  const gridItems: gridItem[] = [
    {
      label: "X:",
      callback: changeX,
      tooltip: "Horizontial Offset",
      value: context.shadow.x,
    },
    {
      label: "Y:",
      callback: changeY,
      tooltip: "Vertical Offset",
      value: context.shadow.y,
    },
    {
      label: "B:",
      callback: changeBlur,
      tooltip: "Blur Radius",
      value: context.shadow.blur,
    },
    {
      label: "S:",
      callback: changeSpread,
      tooltip: "Spread Radius",
      value: context.shadow.spread,
    },
  ];
  return (
    <Grid gridGap="0.5rem" templateColumns=" repeat(4,6rem)">
      <GridItem marginY="2" gridColumn="1/3">
        <ColorPicker color={context.shadow.color} callback={(color: ColorResult) => changeColor(color)} />
      </GridItem>
      <Text gridColumn="3/-1" display="flex" alignItems="center" justifyContent="center" textAlign="center" fontSize=".9rem">
        💡 Each value is in px.
      </Text>
      {gridItems.map(({ label, callback, tooltip, value }, index) => (
        <GridItem gridRow="2" key={index} display="flex" gridGap="1rem" alignItems="center">
          <InputGroup>
            <Tooltip label={tooltip}>
              <InputLeftAddon fontSize=".9rem" justifyContent="center" children={label} />
            </Tooltip>
            <NumberInput inputMode="numeric" placeholder="0" defaultValue={value} onChange={(val) => callback(parseNumberInput(val))}>
              <NumberInputField textAlign="center" p="2" />
            </NumberInput>
          </InputGroup>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ShadowPicker;
