import { Grid, GridProps, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import WrapRadio from "../../components/WrapRadio";

type StackRadioGroupProps = {
  options: { value: string | number; label: JSX.Element | string }[];
  name: string;
  testId?: string;
  callback?: (nextValue: never) => void;
  defaultValue?: string;
  styles?: GridProps;
};

const StackRadioGroup = ({
  options,
  name,
  callback,
  defaultValue,
  styles,
  testId,
}: StackRadioGroupProps): JSX.Element => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue,
    onChange: callback,
  });

  const group = getRootProps();

  return (
    <Grid
      data-testid={testId}
      {...styles}
      justifyContent="space-evenly"
      gridTemplateColumns={{
        base: `repeat(${options.length},minmax(20px, 80px))`,
        md: `repeat(${options.length},minmax(80px, 100px))`,
      }}
      fontSize="md"
      wordBreak="break-word"
      {...group}
    >
      {options.map((option) => {
        const radio = getRadioProps({
          ...getRadioProps(),
          value: option.value,
        });
        return (
          <WrapRadio
            tooltip={option.value as string}
            key={option.value}
            radioProps={radio}
          >
            {option.label}
          </WrapRadio>
        );
      })}
    </Grid>
  );
};

export default React.memo(StackRadioGroup);
