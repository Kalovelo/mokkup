import { Grid, GridItem, InputGroup, InputLeftAddon, InputRightAddon, NumberInput, NumberInputField, Tooltip } from "@chakra-ui/react";
import StackRadioGroup from "containers/StackRadioGroup";
import { DimensionsContext } from "contexts/Dimensions";
import { ImageContext } from "contexts/Image";
import React from "react";
import { scaleDivider } from "utils/resizers";
import { parseNumberInput } from "utils/validation";
import {
  HEIGHT_LABEL,
  HEIGHT_RIGHT_LABEL,
  HEIGHT_TOOLTIP,
  INSTAGRAM_POST_SIZE,
  INSTAGRAM_POST_TITLE,
  INSTAGRAM_STORY_SIZE,
  INSTAGRAM_STORY_TITLE,
  ORIGINAL_SIZE_TITLE,
  SCALE_LABEL,
  SCALE_RIGHT_LABEL,
  SCALE_TOOLTIP,
  TWITTER_POST_SIZE,
  TWITTER_POST_TITLE,
  WIDTH_LABEL,
  WIDTH_RIGHT_LABEL,
  WIDTH_TOOLTIP,
} from "./constants";
import { getUploadedImageDimensions } from "./utils";

const DimensionPicker: React.FC = () => {
  const context = React.useContext(DimensionsContext)!;
  const imageContext = React.useContext(ImageContext)!;

  React.useEffect(() => {
    const setScale = async () => {
      const newDimensions = { ...context.dimensions };
      const { x, y } = (await getUploadedImageDimensions(imageContext.image!)) as { x: number; y: number };
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
      label: SCALE_LABEL,
      callback: changeScale,
      value: Math.round(context.dimensions.scale * 100),
      tooltip: SCALE_TOOLTIP,
      min: 0,
      max: 100,
      rightLabel: SCALE_RIGHT_LABEL,
    },
  ];

  const resolutionItems: gridItem[] = [
    {
      label: WIDTH_LABEL,
      callback: changeWidth,
      value: context.dimensions.resolution!.x,
      tooltip: WIDTH_TOOLTIP,
      rightLabel: WIDTH_RIGHT_LABEL,
    },
    {
      label: HEIGHT_LABEL,
      callback: changeHeight,
      value: context.dimensions.resolution!.y,
      tooltip: HEIGHT_TOOLTIP,
      rightLabel: HEIGHT_RIGHT_LABEL,
    },
  ];

  const options: Option_Type[] = [
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
    {
      value: ORIGINAL_SIZE_TITLE,
      label: ORIGINAL_SIZE_TITLE,
    },
  ];

  const handleChange = async (
    nextValue: typeof ORIGINAL_SIZE_TITLE | typeof TWITTER_POST_TITLE | typeof INSTAGRAM_POST_TITLE | typeof INSTAGRAM_STORY_TITLE
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
        newDimensions.resolution = (await getUploadedImageDimensions(imageContext.image!)) as { x: number; y: number };
        return context.setDimensions(newDimensions);
    }
  };

  return (
    <Grid gridGap="10">
      <GridItem>
        <StackRadioGroup
          styles={{ gridGap: "0.2rem" }}
          defaultValue={TWITTER_POST_TITLE}
          name="device type"
          options={options}
          callback={handleChange}
        />
      </GridItem>
      <GridItem>
        <Grid gridGap="0.5rem" templateColumns="1fr 1fr">
          {resolutionItems.map(({ label, callback, tooltip, value, min, max, rightLabel }, index) => (
            <GridItem gridRow="2" key={index} display="flex" gridGap="1rem" alignItems="center">
              <InputGroup>
                <Tooltip label={tooltip}>
                  <InputLeftAddon fontSize=".7rem" p="1" justifyContent="center" children={label} />
                </Tooltip>
                <NumberInput
                  min={min}
                  w="100%"
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
                <InputRightAddon fontSize=".7rem" children={rightLabel} />
              </InputGroup>
            </GridItem>
          ))}
        </Grid>
      </GridItem>

      {gridItems.map(({ label, callback, tooltip, value, min, max, rightLabel }, index) => (
        <GridItem key={index} display="flex" gridGap="1rem" alignItems="center">
          <InputGroup>
            <Tooltip label={tooltip}>
              <InputLeftAddon fontSize=".9rem" justifyContent="center" children={label} />
            </Tooltip>
            <NumberInput
              min={min}
              max={max}
              textAlign="center"
              inputMode="numeric"
              w="100%"
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
