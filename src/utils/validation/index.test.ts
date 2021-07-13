import { parseNumberInput } from ".";

describe("validation.parseNumberInput", () => {
  const text = "la 1 fd 3 dc 34 !@#$%^&* 9";
  it("strips string from characters except numbers", async () => {
    expect(parseNumberInput(text)).toEqual(13349);
  });

  it("strips string from characters except numbers and has a max value", async () => {
    expect(parseNumberInput(text, { max: 10000 })).toEqual(10000);
  });

  it("strips string from characters except numbers and has a min value", async () => {
    expect(parseNumberInput(text, { min: 20000 })).toEqual(20000);
  });
});
