import { HStack, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import WrapRadio from "../../components/WrapRadio";

type StackRadioGroupProps = {
  options: { value: string | number; label: JSX.Element }[];
  name: string;
  callback?: (nextValue: string) => void;
  defaultValue?: string;
};

const StackRadioGroup: React.FC<StackRadioGroupProps> = ({ options, name, callback, defaultValue }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue,
    onChange: callback,
  });

  const group = getRootProps();

  return (
    <HStack flexWrap="wrap" justifyContent="center" {...group} gridGap="1rem">
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

export default React.memo(StackRadioGroup);
