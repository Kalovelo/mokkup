import { saveAs } from ".";
import defaultImage from "static/defaultImage.jpg";

describe("save.saveAs", () => {
  it("downloads file and names it", async () => {
    const link = document.createElement("a");
    link.click = jest.fn();

    const spy = jest.spyOn(document, "createElement").mockImplementation(() => link);
    await saveAs(defaultImage, "mokkup.com");

    expect(spy).toHaveBeenCalled();

    expect(link.download).toEqual("mokkup.com");
    expect(link.click).toHaveBeenCalledTimes(1);
  });
});
