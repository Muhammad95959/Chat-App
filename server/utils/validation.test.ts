import expect from "expect";
import isRealString from "./isRealString";

describe("is Real String", () => {
  it("Should reject non-string values", () => {
    const res = isRealString(65 as any);
    expect(res).toBe(false);
  });
  it("Should reject strings with only spaces", () => {
    const res = isRealString("             ");
    expect(res).toBe(false);
  });
  it("Should reject string with non-space chars", () => {
    const res = isRealString("       WDJ        ");
    expect(res).toBe(true);
  });
});
