import ColorPicker from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ColorChangeHandler, ColorResult } from "react-color";

describe("ColorPicker", () => {
  HTMLCanvasElement.prototype.getContext = jest.fn();
  let value = "";

  const cb: ColorChangeHandler = (color: ColorResult): void => {
    value = color.hex;
  };

  it("Updates value on change", () => {
    render(<ColorPicker color="#cccccc" callback={cb} />);
    const colorPicker = screen
      .getAllByTestId("colorPickerPopOver")[0]
      ?.querySelector("input");
    fireEvent.change(colorPicker as HTMLInputElement, {
      target: { value: "#aaaaaa" },
    });
    expect(value).toBe("#aaaaaa");
  });
});
