import { assertEquals } from "@std/assert/equals";
import { IsRegExp } from "./object.ts";

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
