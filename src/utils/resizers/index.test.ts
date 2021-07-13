import { resolutionDivider, scaleDivider } from ".";

describe("resizers.resolutionDivider", () => {
  it("returns a smaller resolution while keeping ratio", () => {
    const divider = resolutionDivider(1200, 650);
    expect(divider).toBeGreaterThanOrEqual(1);
  });

  it("returns 1 as the lowest value", () => {
    global.innerHeight = 10000;
    global.innerWidth = 10000;
    const divider = resolutionDivider(1200, 650);
    expect(divider).toBe(1);
  });
});

describe("resizers.scaleDivider", () => {
  it("returns a smaller resolution while keeping ratio", () => {
    const divider = scaleDivider(1200, 650);
    expect(divider).toBeLessThanOrEqual(1);
  });

  it("returns 1 as the lowest value", () => {
    global.innerHeight = 10000;
    global.innerWidth = 10000;
    const divider = scaleDivider(1200, 650);
    expect(divider).toBe(1);
  });
});
