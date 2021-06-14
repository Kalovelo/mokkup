import { Box } from "@chakra-ui/layout";
import { useRadio, UseRadioProps } from "@chakra-ui/react";
import React from "react";
import { Key } from "react";

interface IWrapRadioProps {
  radioProps: UseRadioProps;
  key?: Key | null;
  children: JSX.Element;
}

const WrapRadio = ({ radioProps, children }: IWrapRadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
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
        maxHeight="60px"
        maxWidth="60px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default WrapRadio;
