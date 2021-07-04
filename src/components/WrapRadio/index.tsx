import { Box } from "@chakra-ui/layout";
import { useRadio, UseRadioProps, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Key } from "react";

type WrapRadioProps = {
  radioProps: UseRadioProps;
  key?: Key | null;
  children: JSX.Element;
  tooltip: string;
};

const WrapRadio: React.FC<WrapRadioProps> = ({ radioProps, children, tooltip }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="50%"
          boxShadow="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          p={4}
          py={3}
        >
          {children}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default React.memo(WrapRadio);
