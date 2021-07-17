import { fireEvent, render, screen } from "@testing-library/react";
import App from "App";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";

describe("App.BackgroundPicker", () => {
  HTMLCanvasElement.prototype.getContext = jest.fn();

  beforeAll(() => {
    new MatchMediaMock();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("Rotate gradients left on left rotation", () => {
    render(<App />);
    const left_button = screen.getByLabelText("Rotate gradients left");
    fireEvent.click(left_button);
    expect(screen.getByTestId("foregroundWrapper")).toHaveStyle(
      "background-image: linear-gradient(to top right, #536976, #292E49)"
    );
  });

  it("Rotate gradients right on right rotation", () => {
    render(<App />);
    const right_button = screen.getByLabelText("Rotate gradients right");
    fireEvent.click(right_button);
    expect(screen.getByTestId("foregroundWrapper")).toHaveStyle(
      "background-image: linear-gradient(to bottom right, #536976, #292E49)"
    );
  });
});
