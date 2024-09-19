import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import {
  CanonicalNumericIndexString,
  ToBigInt,
  ToIntegerOrInfinity,
  ToNumber,
  ToNumeric,
  ToObject,
  ToPrimitive,
  ToString,
  ToUint8Clamp,
} from "./cast.ts";

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

Deno.test("ToNumber fail on BigInt", () => {
  assertThrows(
    () => ToNumber(42n),
    TypeError,
    "Cannot convert a BigInt value to a number",
  );
});

Deno.test("ToNumeric BigInt", () => {
  assertEquals(ToNumeric(42n), 42n);
});

Deno.test("ToIntegerOrInfinity fail on BigInt", () => {
  assertThrows(
    () => ToIntegerOrInfinity(42n),
    TypeError,
    "Cannot convert a BigInt value to a number",
  );
});

Deno.test("ToIntegerOrInfinity NaN to 0", () => {
  assertEquals(ToIntegerOrInfinity(NaN), 0);
});

Deno.test("ToIntegerOrInfinity -0 to 0", () => {
  assertStrictEquals(ToIntegerOrInfinity(-0), 0);
});

Deno.test("ToIntegerOrInfinity round towards zero", () => {
  assertEquals(ToIntegerOrInfinity(1.9), 1);
  assertEquals(ToIntegerOrInfinity(-1.9), -1);
});

Deno.test("ToIntegerOrInfinity large integer", () => {
  assertEquals(ToIntegerOrInfinity(10000000000000000), 10000000000000000);
  assertEquals(ToIntegerOrInfinity(-10000000000000000), -10000000000000000);
});

Deno.test("ToIntegerOrInfinity infinity", () => {
  assertEquals(ToIntegerOrInfinity(Infinity), Infinity);
  assertEquals(ToIntegerOrInfinity(-Infinity), -Infinity);
});

Deno.test("ToUint8Clamp round nearest to even", () => {
  assertEquals(ToUint8Clamp(0.49999), 0);
  assertEquals(ToUint8Clamp(0.5), 0);
  assertEquals(ToUint8Clamp(0.50001), 1);
  assertEquals(ToUint8Clamp(1.49999), 1);
  assertEquals(ToUint8Clamp(1.5), 2);
  assertEquals(ToUint8Clamp(1.50001), 2);
});

Deno.test("ToUint8Clamp clamping", () => {
  assertEquals(ToUint8Clamp(-Infinity), 0);
  assertEquals(ToUint8Clamp(-(2 ** 53)), 0);
  assertEquals(ToUint8Clamp(2 ** 53), 255);
  assertEquals(ToUint8Clamp(Infinity), 255);
});

Deno.test("ToUint8Clamp NaN", () => {
  assertEquals(ToUint8Clamp(NaN), 0);
});

Deno.test("ToUint8Clamp -0", () => {
  assertStrictEquals(ToUint8Clamp(-0), 0);
});

Deno.test("ToBigInt large", () => {
  assertEquals(
    ToBigInt(123456789012345678901234567890123456789012345678901234567890n),
    123456789012345678901234567890123456789012345678901234567890n,
  );
  assertEquals(
    ToBigInt(-123456789012345678901234567890123456789012345678901234567890n),
    -123456789012345678901234567890123456789012345678901234567890n,
  );
});

Deno.test("ToBigInt fails on number", () => {
  assertThrows(
    () => ToBigInt(42),
    TypeError,
    "Cannot convert 42 to a BigInt",
  );
});

Deno.test("ToBigInt method call count", () => {
  let count = 0;
  assertEquals(
    ToBigInt({
      valueOf() {
        count++;
        return 42n;
      },
    }),
    42n,
  );
  assertEquals(count, 1);

  count = 0;
  assertThrows(
    () =>
      ToBigInt({
        valueOf() {
          count++;
          return 42;
        },
      }),
    TypeError,
    "Cannot convert 42 to a BigInt",
  );
  assertEquals(count, 1);
});

Deno.test("ToString fails on Symbol", () => {
  assertThrows(
    () => ToString(Symbol.iterator),
    TypeError,
    "Cannot convert a Symbol value to a string",
  );
});

Deno.test("ToObject fails on null and undefined", () => {
  assertThrows(
    () => ToObject(undefined),
    TypeError,
    "Cannot convert undefined or null to object",
  );
  assertThrows(
    () => ToObject(null),
    TypeError,
    "Cannot convert undefined or null to object",
  );
});

Deno.test("CanonicalNumericIndexString base case", () => {
  assertEquals(CanonicalNumericIndexString("42"), 42);
  assertEquals(CanonicalNumericIndexString("1.5"), 1.5);
  assertStrictEquals(CanonicalNumericIndexString("0"), 0);
  assertEquals(CanonicalNumericIndexString("-2.3"), -2.3);
});

Deno.test("CanonicalNumericIndexString minus zero", () => {
  assertStrictEquals(CanonicalNumericIndexString("-0"), -0);
});

Deno.test("CanonicalNumericIndexString noncanonical", () => {
  assertEquals(CanonicalNumericIndexString("1.0"), undefined);
  assertEquals(CanonicalNumericIndexString("1.50"), undefined);
  assertEquals(CanonicalNumericIndexString("0.0000001"), undefined);
  assertEquals(CanonicalNumericIndexString("01"), undefined);
  assertEquals(CanonicalNumericIndexString("0x1"), undefined);
  assertEquals(CanonicalNumericIndexString("1e-3"), undefined);
  assertEquals(CanonicalNumericIndexString("1e+3"), undefined);
  assertEquals(CanonicalNumericIndexString("1e25"), undefined);
});

Deno.test("CanonicalNumericIndexString scientific", () => {
  assertEquals(CanonicalNumericIndexString("1e-7"), 1e-7);
  assertEquals(CanonicalNumericIndexString("1e+21"), 1e+21);
  assertEquals(CanonicalNumericIndexString("-1e-7"), -1e-7);
  assertEquals(CanonicalNumericIndexString("-1e+21"), -1e+21);
});

Deno.test("CanonicalNumericIndexString non-finite", () => {
  assertEquals(CanonicalNumericIndexString("Infinity"), Infinity);
  assertEquals(CanonicalNumericIndexString("-Infinity"), -Infinity);
  assertEquals(CanonicalNumericIndexString("NaN"), NaN);
});

Deno.test("CanonicalNumericIndexString other non-numbers", () => {
  assertEquals(CanonicalNumericIndexString(""), undefined);
  assertEquals(CanonicalNumericIndexString("--Infinity"), undefined);
  assertEquals(CanonicalNumericIndexString("-NaN"), undefined);
  assertEquals(CanonicalNumericIndexString("toString"), undefined);
});
