import expect from "expect";
import generateMessage from "./message";

describe("generateMessage", () => {
  it("Should generate correct message object", () => {
    const from = "Muhammad";
    const text = "Some random text";
    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
