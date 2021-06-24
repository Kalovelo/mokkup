import { Box, Button, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { formatHEX, formatRGBA } from "utils/colors";

export const ColorPick = ({ callback, color }: { callback: ColorChangeHandler; color: string }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box display="flex" gridGap="2">
          <Button width="5" borderRadius="5" height="10" bg={color} />
          {formatHEX(color)}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="max-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <ChromePicker color={formatRGBA(color)} onChange={callback} />
      </PopoverContent>
    </Popover>
  );
};
