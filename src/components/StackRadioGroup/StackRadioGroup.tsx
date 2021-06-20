import { HStack, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import WrapRadio from "../WrapRadio/WrapRadio";

interface IStackRadioGroupProps {
  options: { value: string | number; label: JSX.Element }[];
  name: string;
  callback?: (nextValue: string) => void;
  defaultValue?: string;
}
const StackRadioGroup = ({ options, name, callback, defaultValue }: IStackRadioGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue,
    onChange: callback,
  });

  const group = getRootProps();

  return (
    <HStack {...group} gridGap="1rem">
      {options.map((option) => {
        const radio = getRadioProps({ ...getRadioProps(), value: option.value });
        return (
          <WrapRadio tooltip={option.value as string} key={option.value} radioProps={radio}>
            {option.label}
          </WrapRadio>
        );
      })}
    </HStack>
  );
};

export default StackRadioGroup;
