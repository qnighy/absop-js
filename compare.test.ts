import { assertEquals } from "@std/assert/equals";
import { IsConstructor } from "./compare.ts";

Deno.test("IsConstructor base case", () => {
  assertEquals(IsConstructor(function () {}), true);
  assertEquals(IsConstructor(Array), true);
  assertEquals(IsConstructor(class {}), true);
  assertEquals(IsConstructor(undefined), false);
  assertEquals(IsConstructor(null), false);
  assertEquals(IsConstructor(true), false);
  assertEquals(IsConstructor(42), false);
  assertEquals(IsConstructor("foo"), false);
  assertEquals(IsConstructor(Symbol.iterator), false);
  assertEquals(IsConstructor(42n), false);
  assertEquals(IsConstructor({}), false);
  assertEquals(IsConstructor([]), false);
});

Deno.test("IsConstructor without side effect", () => {
  let called = false;
  const target = function () {
    called = true;
  };
  assertEquals(IsConstructor(target), true);
  assertEquals(called, false);
});
