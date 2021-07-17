import { rotate } from "./utils";

describe("BackgroundPicker.utils.rotate", () => {
  it("should rotate to to-tr, from to-r going left", () => {
    expect(rotate("to-r", "left")).toBe("to-tr");
  });

  it("should rotate to to-tl, from to-t going left", () => {
    expect(rotate("to-t", "left")).toBe("to-tl");
  });

  it("should rotate to to-tr, from to-t going right", () => {
    expect(rotate("to-t", "right")).toBe("to-tr");
  });

  it("should rotate to to-t, from to-tl going right", () => {
    expect(rotate("to-tl", "right")).toBe("to-t");
  });
});
