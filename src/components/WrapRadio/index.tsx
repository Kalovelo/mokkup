import { Box } from "@chakra-ui/layout";
import { Flex, Tooltip, useRadio, UseRadioProps } from "@chakra-ui/react";
import React, { Key } from "react";

type WrapRadioProps = {
  radioProps: UseRadioProps;
  key?: Key | null;
  children: JSX.Element | string;
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
        <Flex
          {...checkbox}
          maxW={typeof children === "string" ? "7rem" : ""}
          w={typeof children === "string" ? "" : "50px"}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          h="100%"
          cursor="pointer"
          borderWidth="1px"
          borderRadius={typeof children === "string" ? "10px" : "50%"}
          boxShadow="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={2}
          py={typeof children === "string" ? 2 : 4}
        >
          {children}
        </Flex>
      </Box>
    </Tooltip>
  );
};

export default React.memo(WrapRadio);
