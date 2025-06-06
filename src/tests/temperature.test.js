import { cToF, fToC } from "../utils/temperature";

describe("temperature utils", () => {
  it("cToF converts correctly", () => {
    expect(cToF(0)).toBe(32);
    expect(cToF(100)).toBe(212);
  });
  it("fToC converts correctly", () => {
    expect(fToC(32)).toBe(0);
    expect(fToC(212)).toBe(100);
  });
});
