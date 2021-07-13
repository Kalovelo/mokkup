import { Directions } from "contexts/Background/types";
import { ColorResult, Color, RGBColor } from "react-color";

export const generateGradient = (colors: string[], direction: Directions[number] = "to-r") => {
  if (!colors.length) return null;
  const reducer = (accumulator: string, currentValue: string) => accumulator + currentValue + ",";
  let gradient = colors.reduce(reducer, `linear(${direction},`);
  gradient += ")";
  return gradient;
};

export const generateShadow = (x: number = 0, y: number = 0, blur: number = 0, spread: number = 0, color: string = "#bbb") =>
  `${x}px ${y}px ${blur}px ${spread}px ${color}`;

export const formatRGBA = (color: ColorResult | Color | string) => {
  if ((color as ColorResult).rgb) {
    const { r, g, b, a } = (color as ColorResult).rgb;
    return `rgba(${r},${g},${b},${a})`;
  }
  if ((color as RGBColor).r) {
    const { r, g, b, a } = color as RGBColor;
    return `rgba(${r},${g},${b},${a})`;
  }
  return color.toString();
};

function _componentToHex(c: string) {
  const num = parseInt(c);
  const hex = num.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export const formatHEX = (color: string) => {
  if (!color.includes("#")) {
    let [r, g, b] = color.split(",");
    [r, g, b] = [r, g, b].map((color) => color.replace(/\D/g, ""));
    return "#" + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
  }
  return color;
};
