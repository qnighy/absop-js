import { assertEquals } from "@std/assert/equals";
import { isObject } from "./langtypes.ts";

Deno.test("isObject on null", () => {
  assertEquals(isObject(null), false);
});

Deno.test("isObject on function and class", () => {
  assertEquals(isObject(() => {}), true);
  assertEquals(isObject(function () {}), true);
  assertEquals(isObject(Array), true);
  assertEquals(isObject(class {}), true);
});
