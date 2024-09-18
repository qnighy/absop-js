import { assertEquals, assertThrows } from "@std/assert";
import { ToPrimitive } from "./cast.ts";

function toThrow(): never {
  throw new Error("Unexpected call");
}
function constant<T>(x: T): () => T {
  return () => x;
}

Deno.test("ToPrimitive default order", () => {
  assertEquals(
    ToPrimitive({ toString: toThrow, valueOf: constant(42) }),
    42,
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: null }),
    "foo",
  );
  assertThrows(
    () => ToPrimitive({ toString: null, valueOf: null }),
    TypeError,
    "Cannot convert object to primitive value",
  );
});

Deno.test("ToPrimitive number order", () => {
  assertEquals(
    ToPrimitive({ toString: toThrow, valueOf: constant(42) }, "NUMBER"),
    42,
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: null }, "NUMBER"),
    "foo",
  );
  assertThrows(
    () => ToPrimitive({ toString: null, valueOf: null }, "NUMBER"),
    TypeError,
    "Cannot convert object to primitive value",
  );
});

Deno.test("ToPrimitive string order", () => {
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: null }, "STRING"),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: null, valueOf: constant(42) }, "STRING"),
    42,
  );
  assertThrows(
    () => ToPrimitive({ toString: null, valueOf: null }, "STRING"),
    TypeError,
    "Cannot convert object to primitive value",
  );
});

Deno.test("ToPrimitive skips non-callables", () => {
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: undefined }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: null }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: true }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: 42 }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: 42n }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: "foo" }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: Symbol.iterator }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: [] }),
    "foo",
  );
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: {} }),
    "foo",
  );
});

Deno.test("ToPrimitive skips non-primitive result", () => {
  assertEquals(
    ToPrimitive({ toString: constant("foo"), valueOf: constant(Object(42)) }),
    "foo",
  );
});

Deno.test("ToPrimitive ordinary this", () => {
  assertEquals(
    ToPrimitive({
      valueOf(this: { foo: number }) {
        return this.foo;
      },
      foo: 42,
    }),
    42,
  );
});

Deno.test("ToPrimitive exotic ignore null and undefined", () => {
  assertEquals(
    ToPrimitive({ valueOf: constant(42), [Symbol.toPrimitive]: null }),
    42,
  );
  assertEquals(
    ToPrimitive({ valueOf: constant(42), [Symbol.toPrimitive]: undefined }),
    42,
  );
});

Deno.test("ToPrimitive exotic this", () => {
  assertEquals(
    ToPrimitive({
      [Symbol.toPrimitive](this: { foo: number }) {
        return this.foo;
      },
      foo: 42,
    }),
    42,
  );
});

Deno.test("ToPrimitive exotic fail on non-callable", () => {
  assertThrows(
    () => ToPrimitive({ [Symbol.toPrimitive]: 42 }),
    TypeError,
  );
});

Deno.test("ToPrimitive exotic fail on non-primitive", () => {
  assertThrows(
    () =>
      ToPrimitive({
        [Symbol.toPrimitive]: constant(Object(42)),
      }),
    TypeError,
    "Cannot convert object to primitive value",
  );
});
