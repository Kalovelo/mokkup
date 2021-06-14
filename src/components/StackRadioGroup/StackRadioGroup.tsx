import { HStack, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import WrapRadio from "../WrapRadio/WrapRadio";

interface IStackRadioGroupProps {
  options: { value: string | number; label: JSX.Element }[];
  name: string;
  callback?: (nextValue: string) => void;
}
const StackRadioGroup = ({ options, name, callback }: IStackRadioGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    onChange: callback,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((option) => {
        const radio = getRadioProps({ ...getRadioProps(), value: option.value });
        return (
          <WrapRadio key={option.value} radioProps={radio}>
            {option.label}
          </WrapRadio>
        );
      })}
    </HStack>
  );
};

export default StackRadioGroup;
