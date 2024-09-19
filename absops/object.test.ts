import { assertEquals } from "@std/assert/equals";
import { IsLessThan, IsRegExp } from "./object.ts";

function bare<T extends object>(x: T): T {
  Object.setPrototypeOf(x, null);
  return x;
}

Deno.test("IsRegExp normal case", () => {
  assertEquals(IsRegExp(/abc/), true);
  assertEquals(IsRegExp(42), false);
  assertEquals(IsRegExp("abc"), false);
  assertEquals(IsRegExp({}), false);
  assertEquals(IsRegExp(undefined), false);
  assertEquals(IsRegExp(null), false);
});

Deno.test("IsRegExp when toStringTag is overridden", () => {
  assertEquals(
    IsRegExp(Object.assign(/abc/, {
      [Symbol.toStringTag]: "Something",
    })),
    true,
  );
});

Deno.test("IsRegExp when prototype is overridden", () => {
  assertEquals(
    IsRegExp(bare(/abc/)),
    true,
  );
});

Deno.test("IsRegExp side effects, non-match case", () => {
  let countMatch = 0;
  let countSource = 0;
  let countFlags = 0;
  const r = /abc/;
  r.lastIndex = -10;
  Object.defineProperties(r, {
    [Symbol.match]: {
      get() {
        countMatch++;
        return undefined;
      },
    },
    source: {
      get() {
        countSource++;
        return "abc";
      },
    },
    flags: {
      get() {
        countFlags++;
        return "";
      },
    },
  });
  assertEquals(IsRegExp(r), true);
  assertEquals(countMatch, 1);
  assertEquals(countSource, 0);
  assertEquals(countFlags, 0);
  assertEquals(r.lastIndex, -10);
});

Deno.test("IsRegExp side effects, match case", () => {
  let countMatch = 0;
  let countSource = 0;
  let countFlags = 0;
  const r = /abc/;
  r.lastIndex = -10;
  Object.defineProperties(r, {
    [Symbol.match]: {
      get() {
        countMatch++;
        return true;
      },
    },
    source: {
      get() {
        countSource++;
        return "abc";
      },
    },
    flags: {
      get() {
        countFlags++;
        return "";
      },
    },
  });
  assertEquals(IsRegExp(r), true);
  assertEquals(countMatch, 1);
  assertEquals(countSource, 0);
  assertEquals(countFlags, 0);
  assertEquals(r.lastIndex, -10);
});

Deno.test("IsLessThan normal case", () => {
  assertEquals(IsLessThan(1, 2, false), true);
  assertEquals(IsLessThan(2, 2, false), false);
  assertEquals(IsLessThan(2, 1, false), false);
  assertEquals(IsLessThan(0, NaN, false), undefined);
  assertEquals(IsLessThan(NaN, 0, false), undefined);
  assertEquals(IsLessThan(NaN, NaN, false), undefined);

  assertEquals(IsLessThan("a", "b", false), true);
  assertEquals(IsLessThan("b", "b", false), false);
  assertEquals(IsLessThan("b", "a", false), false);

  assertEquals(IsLessThan(1n, 2n, false), true);
  assertEquals(IsLessThan(2n, 2n, false), false);
  assertEquals(IsLessThan(2n, 1n, false), false);
});

Deno.test("IsLessThan mixed case", () => {
  assertEquals(IsLessThan(1n, "2", false), true);
  assertEquals(IsLessThan(2n, "2", false), false);
  assertEquals(IsLessThan(2n, "1", false), false);
  assertEquals(IsLessThan(0n, "0a", false), undefined);
  assertEquals(
    IsLessThan(10000000000000000n, "10000000000000001", false),
    true,
  );

  assertEquals(IsLessThan("1", 2n, false), true);
  assertEquals(IsLessThan("2", 2n, false), false);
  assertEquals(IsLessThan("2", 1n, false), false);
  assertEquals(IsLessThan("0a", 0n, false), undefined);
  assertEquals(
    IsLessThan("-10000000000000001", -10000000000000000n, false),
    true,
  );

  assertEquals(IsLessThan(1n, 2, false), true);
  assertEquals(IsLessThan(2n, 2, false), false);
  assertEquals(IsLessThan(2n, 1, false), false);
  assertEquals(IsLessThan(0n, NaN, false), undefined);
  assertEquals(
    IsLessThan(123456789123456789123456789123456789n, Infinity, false),
    true,
  );
  assertEquals(
    IsLessThan(-123456789123456789123456789123456789n, -Infinity, false),
    false,
  );
  assertEquals(IsLessThan(1, 2n, false), true);
  assertEquals(IsLessThan(2, 2n, false), false);
  assertEquals(IsLessThan(2, 1n, false), false);
  assertEquals(IsLessThan(NaN, 0n, false), undefined);
  assertEquals(
    IsLessThan(Infinity, 123456789123456789123456789123456789n, false),
    false,
  );
  assertEquals(
    IsLessThan(-Infinity, -123456789123456789123456789123456789n, false),
    true,
  );
});

Deno.test("IsLessThan side effects", () => {
  const sideEffects: string[] = [];
  IsLessThan(
    {
      valueOf() {
        sideEffects.push("valueOf left");
        return 0;
      },
    },
    {
      valueOf() {
        sideEffects.push("valueOf right");
        return 0;
      },
    },
    false,
  );
  assertEquals(sideEffects, ["valueOf right", "valueOf left"]);
  sideEffects.splice(0, sideEffects.length);
  IsLessThan(
    {
      valueOf() {
        sideEffects.push("valueOf left");
        return 0;
      },
    },
    {
      valueOf() {
        sideEffects.push("valueOf right");
        return 0;
      },
    },
    true,
  );
  assertEquals(sideEffects, ["valueOf left", "valueOf right"]);
});
