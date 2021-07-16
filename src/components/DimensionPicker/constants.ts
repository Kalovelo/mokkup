export type Option_Type = { value: string; label: JSX.Element | string };

export type Item = {
  label: string;
  callback: (val: number) => void;
  value: number;
  tooltip: string;
  min?: number;
  max?: number;
  rightLabel?: string;
};

export const TWITTER_POST_TITLE = "Twitter post";
export const TWITTER_POST_SIZE = { x: 1200, y: 630 };

export const INSTAGRAM_POST_TITLE = "Instagram post";
export const INSTAGRAM_POST_SIZE = { x: 1080, y: 1080 };

export const INSTAGRAM_STORY_TITLE = "Instagram story";
export const INSTAGRAM_STORY_SIZE = { x: 1080, y: 1920 };

export const ORIGINAL_SIZE_TITLE = "Original Size";

export const SCALE_LABEL = "Scale:";
export const SCALE_TOOLTIP = "Value between [0,100]";
export const SCALE_RIGHT_LABEL = "%";

export const WIDTH_LABEL = "Width:";
export const WIDTH_TOOLTIP = "Width Value is in px.";
export const WIDTH_RIGHT_LABEL = "px";

export const HEIGHT_LABEL = "Height:";
export const HEIGHT_TOOLTIP = "Height Value is in px.";
export const HEIGHT_RIGHT_LABEL = "px";

export const PREBUILT_DIMENSIONS_TEST_ID = "Prebuilt Dimensions";
