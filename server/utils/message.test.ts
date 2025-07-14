import expect from "expect";
import { generateMessage, generateLocationMessage } from "./message";

describe("Generate Message", () => {
  it("Should generate correct message object", () => {
    const from = "Muhammad";
    const text = "Some random text";
    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate Location Message", () => {
  it("should generate correct location object", () => {
    const from = "Muhammad";
    const lat = 15;
    const lng = 56;
    const url = `https://www.google.com/maps?q=${lat}, ${lng}`;
    const message = generateLocationMessage(from, lat, lng);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
