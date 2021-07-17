import { ColorResult, RGBColor } from "react-color";
import { formatHEX, formatRGBA, generateGradient, generateShadow } from ".";

describe("colors.generateGradient", () => {
  const colors = ["#cccccc,#aaaaaa,#123456"];
  const direction = "to-r";
  it("returns a linear-gradient Chakra property", () => {
    expect(generateGradient(colors, direction)).toBe(
      "linear(to-r,#cccccc,#aaaaaa,#123456,)"
    );
  });

  it("Throws error when given no colors", () => {
    expect(() => generateGradient([], direction)).toThrowError();
  });
});

describe("colors.generateShadow", () => {
  it("returns a boxShadow property", () => {
    expect(generateShadow(1, 2, 3, 4, "#cccccc")).toBe(
      "1px 2px 3px 4px #cccccc"
    );
  });
});

describe("colors.formatRGBA", () => {
  it("returns a ColorResult color string with an rgba format", () => {
    const color: ColorResult = {
      rgb: {
        r: 200,
        g: 200,
        b: 200,
        a: 0.2,
      },
      hex: "#cccccc",
      hsl: { h: 200, l: 200, s: 200 },
    };

    expect(formatRGBA(color)).toBe("rgba(200,200,200,0.2)");
  });

  it("returns a RGBColor color string with an rgba format", () => {
    const color: RGBColor = {
      r: 200,
      g: 200,
      b: 200,
      a: 0.2,
    };

    expect(formatRGBA(color)).toBe("rgba(200,200,200,0.2)");
  });
});

describe("colors.formatHEX", () => {
  it("returns a #HEX color string when given an rgba string", () => {
    expect(formatHEX("rgba(48,28,146,1)")).toBe("#301c92");
  });

  it("returns a #HEX color string when given a #HEX string", () => {
    expect(formatHEX("#301c92")).toBe("#301c92");
  });
});
