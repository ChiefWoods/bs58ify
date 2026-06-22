import { expect, test } from "bun:test";

import { decodeBase58, encodeByteArray } from "../src/conversion";

test("encodes a JSON byte array as Base58", () => {
  expect(encodeByteArray("[1,2,3,4]")).toBe("2VfUX");
});

test("decodes Base58 into a JSON byte array", () => {
  expect(decodeBase58("2VfUX")).toBe("[1,2,3,4]");
});

test("rejects a JSON array containing an invalid byte", () => {
  expect(() => encodeByteArray("[256]")).toThrow("Input must be a JSON array of bytes.");
});
