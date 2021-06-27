import { Box, Button, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { formatHEX, formatRGBA } from "utils/colors";

export const ColorPick = ({ callback, color }: { callback: ColorChangeHandler; color: string }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button display="flex" fontWeight="100" justifyContent="space-between" paddingY="10px" paddingLeft="0" paddingRight="10%">
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
