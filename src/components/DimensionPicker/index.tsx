import {
  Grid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from "@chakra-ui/react";
import StackRadioGroup from "containers/StackRadioGroup";
import { useDimensions } from "contexts/Dimensions";
import { CHANGE_HEIGHT, CHANGE_RESOLUTION, CHANGE_SCALE, CHANGE_WIDTH } from "contexts/Dimensions/constants";
import { useImage } from "contexts/Image";
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
  Item,
  Option_Type,
  PREBUILT_DIMENSIONS_TEST_ID,
} from "./constants";
import { getUploadedImageDimensions } from "./utils";

const DimensionPicker: React.FC = () => {
  const context = useDimensions()!;
  const imageContext = useImage()!;

  React.useEffect(() => {
    const setScale = async () => {
      const { x, y } = (await getUploadedImageDimensions(imageContext.image!)) as { x: number; y: number };
      context.dispatch({ type: CHANGE_SCALE, payload: scaleDivider(x, y) });
    };
    setScale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageContext.image, getUploadedImageDimensions]);

  const changeScale = (scale: number) => context.dispatch({ type: CHANGE_SCALE, payload: scale / 100 });
  const changeWidth = (width: number) => context.dispatch({ type: CHANGE_WIDTH, payload: width });
  const changeHeight = (height: number) => context.dispatch({ type: CHANGE_HEIGHT, payload: height });

  const gridItems: Item[] = [
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

  const resolutionItems: Item[] = [
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
    switch (nextValue) {
      case TWITTER_POST_TITLE:
        return context.dispatch({ type: CHANGE_RESOLUTION, payload: TWITTER_POST_SIZE });
      case INSTAGRAM_POST_TITLE:
        return context.dispatch({ type: CHANGE_RESOLUTION, payload: INSTAGRAM_POST_SIZE });
      case INSTAGRAM_STORY_TITLE:
        return context.dispatch({ type: CHANGE_RESOLUTION, payload: INSTAGRAM_STORY_SIZE });
      case ORIGINAL_SIZE_TITLE:
        return context.dispatch({
          type: CHANGE_RESOLUTION,
          payload: (await getUploadedImageDimensions(imageContext.image!)) as { x: number; y: number },
        });
    }
  };

  return (
    <Grid gridGap="10">
      <GridItem>
        <StackRadioGroup
          testId={PREBUILT_DIMENSIONS_TEST_ID}
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
                  data-testid={label}
                  min={min}
                  w="100%"
                  max={max}
                  textAlign="center"
                  inputMode="numeric"
                  placeholder="0"
                  value={value}
                  defaultValue={value}
                  onChange={(val) => callback(parseNumberInput(val, { min, max }))}
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
              onChange={(val) => callback(parseNumberInput(val, { min, max }))}
            >
              <NumberInputField textAlign="center" p="2" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon children={rightLabel} />
          </InputGroup>
        </GridItem>
      ))}
    </Grid>
  );
};

export default DimensionPicker;
