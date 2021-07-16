import { fireEvent, getQueriesForElement } from "@testing-library/react";
import { DimensionsProvider } from "contexts/Dimensions";
import { ImageProvider } from "contexts/Image";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import ReactDOM from "react-dom";
import DimensionPicker from ".";
import {
  HEIGHT_LABEL,
  INSTAGRAM_POST_SIZE,
  INSTAGRAM_POST_TITLE,
  INSTAGRAM_STORY_SIZE,
  INSTAGRAM_STORY_TITLE,
  PREBUILT_DIMENSIONS_TEST_ID,
  TWITTER_POST_SIZE,
  TWITTER_POST_TITLE,
  WIDTH_LABEL,
} from "./constants";

describe("DimensionPicker", () => {
  const root = document.createElement("div");
  HTMLCanvasElement.prototype.getContext = jest.fn();

  new MatchMediaMock();

  ReactDOM.render(
    <ImageProvider>
      <DimensionsProvider>
        <DimensionPicker />
      </DimensionsProvider>
    </ImageProvider>,
    root
  );

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const { getByDisplayValue, getByTestId } = getQueriesForElement(root);
  it("renders 4 types of dimension options", () => {
    expect(getByTestId(PREBUILT_DIMENSIONS_TEST_ID).querySelectorAll("label").length).toBe(4);
  });

  it(`has ${TWITTER_POST_TITLE} option checked by default`, () => {
    expect((getByDisplayValue(TWITTER_POST_TITLE) as HTMLInputElement).checked).toBeTruthy();
    const { x, y } = TWITTER_POST_SIZE;
    expect((getByTestId(WIDTH_LABEL).children[0] as HTMLInputElement).value).toBe(x.toString());
    expect((getByTestId(HEIGHT_LABEL).children[0] as HTMLInputElement).value).toBe(y.toString());
  });

  it(`has ${INSTAGRAM_POST_TITLE} size when checked`, () => {
    fireEvent(getByDisplayValue(INSTAGRAM_POST_TITLE), new MouseEvent("click", { bubbles: true }));
    expect((getByDisplayValue(INSTAGRAM_POST_TITLE) as HTMLInputElement).checked).toBeTruthy();
    const { x, y } = INSTAGRAM_POST_SIZE;
    expect((getByTestId(WIDTH_LABEL).children[0] as HTMLInputElement).value).toBe(x.toString());
    expect((getByTestId(HEIGHT_LABEL).children[0] as HTMLInputElement).value).toBe(y.toString());
  });

  it(`has ${INSTAGRAM_STORY_TITLE} size when checked`, () => {
    fireEvent(getByDisplayValue(INSTAGRAM_STORY_TITLE), new MouseEvent("click", { bubbles: true }));
    expect((getByDisplayValue(INSTAGRAM_STORY_TITLE) as HTMLInputElement).checked).toBeTruthy();
    const { x, y } = INSTAGRAM_STORY_SIZE;
    expect((getByTestId(WIDTH_LABEL).children[0] as HTMLInputElement).value).toBe(x.toString());
    expect((getByTestId(HEIGHT_LABEL).children[0] as HTMLInputElement).value).toBe(y.toString());
  });
});
