import { Box, Button, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { formatHEX, formatRGBA } from "utils/colors";

type ColorPickProps = { callback: ColorChangeHandler; color: string };

const ColorPicker: React.FC<ColorPickProps> = ({ callback, color }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button width="100%" display="flex" fontWeight="100" justifyContent="space-between" paddingY="10px" paddingLeft="0" paddingRight="10%">
          <Box width="10" borderRadius="5" height="10" bg={color}></Box>
          {formatHEX(color)}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="max-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <ChromePicker color={formatRGBA(color)} onChange={callback} />
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(ColorPicker);
