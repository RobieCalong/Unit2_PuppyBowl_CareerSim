// const verifyName = require("./input");
import { verifyName } from "./input.js";

test("verify name if its a string", () => {
  expect(verifyName("BrownJames")).toBe(true);
});
