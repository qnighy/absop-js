import { assert, assertEquals } from "@std/assert";
import { dummyConstructor } from "./utils.ts";

Deno.test("dummyConstructor", () => {
  const obj = { foo: 42 };
  const klass = dummyConstructor(obj);
  const instance = new klass();
  assertEquals(instance.foo, 42);
  obj.foo = 43;
  assertEquals(instance.foo, 43);
});
