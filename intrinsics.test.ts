import { assertEquals, assert, assertInstanceOf, assertArrayIncludes, assertExists } from "@std/assert";
import { ArrayIteratorPrototype } from "./intrinsics.ts";
import { dummyConstructor } from "./utils.ts";

const ArrayIterator = dummyConstructor(ArrayIteratorPrototype);

Deno.test("ArrayIteratorPrototype", () => {
  assertInstanceOf([][Symbol.iterator](), ArrayIterator);
  assertArrayIncludes(Reflect.ownKeys(ArrayIteratorPrototype), ["next", Symbol.toStringTag]);
});
