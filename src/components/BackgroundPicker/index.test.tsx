import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BackgroundProvider } from "contexts/Background";
import { ImageProvider } from "contexts/Image";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import BackgroundPicker from ".";

describe("BackgroundPicker", () => {
  HTMLCanvasElement.prototype.getContext = jest.fn();

  beforeAll(() => {
    new MatchMediaMock();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const defaultRender = () =>
    render(
      <ChakraProvider>
        <ImageProvider>
          <BackgroundProvider>
            <BackgroundPicker />
          </BackgroundProvider>
        </ImageProvider>
      </ChakraProvider>
    );

  it("Has Royal Blue prebuilt gradient by default", () => {
    defaultRender();
    const [c1, c2] = screen.getAllByLabelText("Pick color");
    expect(c1.childNodes[1].textContent).toBe("#536976");
    expect(c2.childNodes[1].textContent).toBe("#292E49");
  });

  it("Changes color on color pick", () => {
    defaultRender();
    const [c1] = screen.getAllByLabelText("Pick color");
    const colorPicker = screen.getAllByTestId("colorPickerPopOver")[0]?.querySelector("input");
    fireEvent.change(colorPicker as HTMLInputElement, { target: { value: "#cccccc" } });
    expect(c1.childNodes[1].textContent).toBe("#cccccc");
  });

  it("Removes a new color on decrement click", () => {
    defaultRender();
    const decrement_button = screen.getByLabelText("Remove color");
    const colors = screen.getAllByLabelText("Pick color");
    expect(colors.length).toBe(2);
    fireEvent.click(decrement_button);
    const updated_colors = screen.getAllByLabelText("Pick color");
    expect(updated_colors.length).toBe(1);
  });

  it("Adds a new color on increment click", () => {
    defaultRender();
    const increment_button = screen.getByLabelText("Add color");
    const colors = screen.getAllByLabelText("Pick color");
    expect(colors.length).toBe(2);
    fireEvent.click(increment_button);
    const updated_colors = screen.getAllByLabelText("Pick color");
    expect(updated_colors.length).toBe(3);
  });
});

describe("BackgroundPicker.PrebuiltPicker", () => {
  HTMLCanvasElement.prototype.getContext = jest.fn();

  beforeAll(() => {
    new MatchMediaMock();
  });

  beforeEach(() => {
    render(
      <ChakraProvider>
        <ImageProvider>
          <BackgroundProvider>
            <BackgroundPicker />
          </BackgroundProvider>
        </ImageProvider>
      </ChakraProvider>
    );
  });

  it("Shows by default 6 prebuilt gradients with 3 util buttons", async () => {
    const gradient_button = screen.getByLabelText("Open prebuilt uiGradients");
    fireEvent.click(gradient_button);
    const dialog = await screen.findByRole("dialog");
    expect(dialog.querySelectorAll("button").length).toBe(9);
  });

  it("Updates current gradient combination with 3 options", () => {
    const gradient_button = screen.getByLabelText("Open prebuilt uiGradients");
    fireEvent.click(gradient_button);
    const chosen_gradient = screen.getByLabelText("Choose Radioactive Heat gradient");
    fireEvent.click(chosen_gradient);
    const colors = screen.getAllByLabelText("Pick color");
    expect(colors.length).toBe(3);
    expect(colors[0].childNodes[1].textContent).toBe("#F7941E");
    expect(colors[1].childNodes[1].textContent).toBe("#72C6EF");
    expect(colors[2].childNodes[1].textContent).toBe("#00A651");
  });
});
