import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import CookieNotice from ".";

describe("ColorPicker", () => {
  HTMLCanvasElement.prototype.getContext = jest.fn();
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: "",
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("Hides cookie notice on click and saves cookie", async () => {
    render(<CookieNotice />);
    const accept_button = screen.getByLabelText("Close cookie notice");
    userEvent.click(accept_button);
    jest.runAllTimers();
    await waitFor(() =>
      expect(
        screen.queryByLabelText("Close cookie notice")
      ).not.toBeInTheDocument()
    );
    expect(window.document.cookie).toMatch(/(hide)/i);
  });
});
