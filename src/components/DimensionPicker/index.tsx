import { Grid, GridItem, InputGroup, InputLeftAddon, InputRightAddon, NumberInput, NumberInputField, Tooltip } from "@chakra-ui/react";
import StackRadioGroup from "containers/StackRadioGroup";
import { DimensionsContext } from "contexts/Dimensions";
import { ImageContext } from "contexts/Image";
import React from "react";
import { scaleDivider } from "utils/resizers";
import { parseNumberInput } from "utils/validation";
import {
  INSTAGRAM_POST_SIZE,
  INSTAGRAM_POST_TITLE,
  INSTAGRAM_POST_TITLE_TYPE,
  INSTAGRAM_STORY_SIZE,
  INSTAGRAM_STORY_TITLE,
  INSTAGRAM_STORY_TITLE_TYPE,
  ORIGINAL_SIZE_TITLE,
  ORIGINAL_SIZE_TITLE_TYPE,
  TWITTER_POST_SIZE,
  TWITTER_POST_TITLE,
  TWITTER_POST_TITLE_TYPE,
} from "./constants";

const DimensionPicker: React.FC = () => {
  const context = React.useContext(DimensionsContext)!;
  const imageContext = React.useContext(ImageContext)!;

  const getUploadedImageDimensions = React.useCallback(() => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          x: img.width,
          y: img.height,
        });
      img.src = imageContext.image!;
      img.remove();
    });
  }, [imageContext.image]);

  React.useEffect(() => {
    const setScale = async () => {
      const newDimensions = { ...context.dimensions };
      const { x, y } = (await getUploadedImageDimensions()) as { x: number; y: number };
      newDimensions.scale = scaleDivider(x, y);
      context.setDimensions(newDimensions);
    };
    setScale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageContext.image, getUploadedImageDimensions]);

  const changeScale = (scale: number) => {
    const newDimensions = { ...context.dimensions };
    newDimensions.scale = scale / 100;
    context.setDimensions(newDimensions);
  };

  const changeWidth = (width: number) => {
    const newDimensions = { ...context.dimensions };
    newDimensions.resolution!.x = width;
    context.setDimensions(newDimensions);
  };

  const changeHeight = (height: number) => {
    const newDimensions = { ...context.dimensions };
    newDimensions.resolution!.y = height;
    context.setDimensions(newDimensions);
  };

  type Option_Type = { value: string; label: JSX.Element | string };

  type gridItem = {
    label: string;
    callback: (val: number) => void;
    value: number;
    tooltip: string;
    min?: number;
    max?: number;
    rightLabel?: string;
  };

  const gridItems: gridItem[] = [
    {
      label: "Scale:",
      callback: changeScale,
      value: Math.round(context.dimensions.scale * 100),
      tooltip: "Value between [0,1]",
      min: 0,
      max: 100,
      rightLabel: "%",
    },
  ];

  const resolutionItems: gridItem[] = [
    {
      label: "Width:",
      callback: changeWidth,
      value: context.dimensions.resolution!.x,
      tooltip: "Width Value is in px.",
      rightLabel: "px",
    },
    {
      label: "Height:",
      callback: changeHeight,
      value: context.dimensions.resolution!.y,
      tooltip: "Height Value is in px.",
      rightLabel: "px",
    },
  ];

  const options: Option_Type[] = [
    {
      value: ORIGINAL_SIZE_TITLE,
      label: ORIGINAL_SIZE_TITLE,
    },
    {
      value: TWITTER_POST_TITLE,
      label: TWITTER_POST_TITLE,
    },
    {
      value: INSTAGRAM_STORY_TITLE,
      label: INSTAGRAM_STORY_TITLE,
    },
    {
      value: INSTAGRAM_POST_TITLE,
      label: INSTAGRAM_POST_TITLE,
    },
  ];

  const handleChange = async (
    nextValue: ORIGINAL_SIZE_TITLE_TYPE | TWITTER_POST_TITLE_TYPE | INSTAGRAM_POST_TITLE_TYPE | INSTAGRAM_STORY_TITLE_TYPE
  ) => {
    const newDimensions = { ...context.dimensions };
    switch (nextValue) {
      case TWITTER_POST_TITLE:
        newDimensions.resolution = TWITTER_POST_SIZE;
        return context.setDimensions(newDimensions);
      case INSTAGRAM_POST_TITLE:
        newDimensions.resolution = INSTAGRAM_POST_SIZE;
        return context.setDimensions(newDimensions);
      case INSTAGRAM_STORY_TITLE:
        newDimensions.resolution = INSTAGRAM_STORY_SIZE;
        return context.setDimensions(newDimensions);
      case ORIGINAL_SIZE_TITLE:
        newDimensions.resolution = (await getUploadedImageDimensions()) as { x: number; y: number };
        return context.setDimensions(newDimensions);
    }
  };

  return (
    <Grid gridGap="10">
      <StackRadioGroup
        styles={{ gridGap: "0.5rem" }}
        defaultValue={TWITTER_POST_TITLE}
        name="device type"
        options={options}
        callback={handleChange}
      />

      <Grid gridGap="0.5rem" templateColumns="1fr 1fr">
        {resolutionItems.map(({ label, callback, tooltip, value, min, max, rightLabel }, index) => (
          <GridItem gridRow="2" key={index} display="flex" gridGap="1rem" alignItems="center">
            <InputGroup>
              <Tooltip label={tooltip}>
                <InputLeftAddon fontSize=".9rem" justifyContent="center" children={label} />
              </Tooltip>
              <NumberInput
                min={min}
                max={max}
                textAlign="center"
                inputMode="numeric"
                placeholder="0"
                value={value}
                defaultValue={value}
                onChange={(val) => callback(parseNumberInput(val, min, max))}
              >
                <NumberInputField textAlign="center" p="2" />
              </NumberInput>
              <InputRightAddon children={rightLabel} />
            </InputGroup>
          </GridItem>
        ))}
      </Grid>
      {gridItems.map(({ label, callback, tooltip, value, min, max, rightLabel }, index) => (
        <GridItem gridRow="2" key={index} display="flex" gridGap="1rem" alignItems="center">
          <InputGroup>
            <Tooltip label={tooltip}>
              <InputLeftAddon fontSize=".9rem" justifyContent="center" children={label} />
            </Tooltip>
            <NumberInput
              min={min}
              max={max}
              textAlign="center"
              inputMode="numeric"
              placeholder="0"
              defaultValue={value}
              value={value}
              onChange={(val) => callback(parseNumberInput(val, min, max))}
            >
              <NumberInputField textAlign="center" p="2" />
            </NumberInput>
            <InputRightAddon children={rightLabel} />
          </InputGroup>
        </GridItem>
      ))}
    </Grid>
  );
};

export default DimensionPicker;
