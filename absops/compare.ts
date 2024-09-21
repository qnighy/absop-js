/**
 * 7.2 Testing and Comparison Operations https://tc39.es/ecma262/multipage/abstract-operations.html#sec-testing-and-comparison-operations
 */

import { isObject, type LanguageValue } from "../types.ts";
import type { ObjectRecord } from "../utils.ts";
import { ToPrimitive } from "./cast.ts";

/**
 * 7.2.1 RequireObjectCoercible ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-requireobjectcoercible
 */
// deno-lint-ignore ban-types
export function RequireObjectCoercible(argument: LanguageValue): {} {
  if (argument === null || argument === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return argument;
}

/**
 * 7.2.2 IsArray ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isarray
 */
// deno-lint-ignore no-explicit-any
export function IsArray(argument: LanguageValue): argument is any[] {
  return Array.isArray(argument);
}

/**
 * 7.2.3 IsCallable ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable
 */
// deno-lint-ignore ban-types
export function IsCallable(argument: LanguageValue): argument is Function {
  return typeof argument === "function";
}

/**
 * 7.2.4 IsConstructor ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isconstructor
 */
export function IsConstructor(argument: LanguageValue): boolean {
  // It is difficult to figure out existence of [[Construct]]
  // without actually calling it.
  // However, as Proxy allows to trap [[Construct]]
  // only when the target has [[Call]] and [[Construct]].
  // In an ordinary implementation, [[Construct]] implies [[Call]].

  if (typeof argument !== "function") {
    return false;
  }
  const constructor = new Proxy(argument, {
    construct(_target, _argArray, _newTarget) {
      return {};
    },
  }) as new () => object;
  try {
    new constructor();
    return true;
  } catch {
    return false;
  }
}

/**
 * 7.2.5 IsExtensible ( O ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isextensible-o
 */
export function IsExtensible(o: object): boolean {
  return Object.isExtensible(o);
}

/**
 * 7.2.6 IsRegExp ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isregexp
 */
export function IsRegExp(argument: unknown): boolean {
  // Most uses of IsRegExp also Get something more from argument,
  // therefore cannot be used to reproduce the exact IsRegExp behavior here.
  // Therefore we reimplement it according to the spec.

  if (!isObject(argument)) {
    return false;
  }
  const matcher = (argument as ObjectRecord)[Symbol.match];
  if (matcher !== undefined) {
    return !!matcher;
  }
  return hasRegExpMatcher(argument);
}

function hasRegExpMatcher(obj: object): boolean {
  let hasSlot = false;
  try {
    RegExp.prototype.exec.call(obj, {
      toString() {
        // toString() being called means the last step is successful,
        // meaning the object has the [[RegExpMatcher]] internal slot.
        hasSlot = true;
        // Avoid side-effect on lastMatch by force-exiting exec()
        // from ToString() call.
        throw new TypeError();
      },
    } as unknown as string);
  } catch (e) {
    if (!(e instanceof TypeError)) {
      throw e;
    }
  }
  return hasSlot;
}

/**
 * 7.2.7 Static Semantics: IsStringWellFormedUnicode ( string ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstringwellformedunicode
 */
export function IsStringWellFormedUnicode(string: string): boolean {
  return string.isWellFormed();
}

/**
 * 7.2.8 SameType ( x, y ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-sametype
 */
export function SameType(x: unknown, y: unknown): boolean {
  const xt = typeof x;
  const yt = typeof y;
  if (xt === "object" || yt === "object") {
    if (xt === null || yt === null) {
      return xt === yt;
    } else {
      return (xt === "object" || xt === "function") &&
        (yt === "object" || yt === "function");
    }
  } else {
    return xt === yt;
  }
}

/**
 * 7.2.9 SameValue ( x, y ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevalue
 */
export function SameValue(x: LanguageValue, y: LanguageValue): boolean {
  return Object.is(x, y);
}

/**
 * 7.2.10 SameValueZero ( x, y ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero
 */
export function SameValueZero(x: LanguageValue, y: LanguageValue): boolean {
  return x === y ||
    (typeof x === "number" && typeof y === "number" && Number.isNaN(x) &&
      Number.isNaN(y));
}

/**
 * 7.2.12 IsLessThan ( x, y, LeftFirst ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-islessthan
 */
export function IsLessThan(
  x: LanguageValue,
  y: LanguageValue,
  leftFirst: boolean,
): boolean | undefined {
  // This is x < y ? true : x >= y ? false : undefined but without the side effects.
  // There seems no smart way to implement it without ToPrimitive.

  let px: number, py: number;
  if (leftFirst) {
    px = ToPrimitive(x, "NUMBER") as number;
    py = ToPrimitive(y, "NUMBER") as number;
  } else {
    py = ToPrimitive(y, "NUMBER") as number;
    px = ToPrimitive(x, "NUMBER") as number;
  }
  // Now we are free from side effects.
  return px < py ? true : px >= py ? false : undefined;
}

/**
 * 7.2.13 IsLooselyEqual ( x, y ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-islooselyequal
 */
export function IsLooselyEqual(x: LanguageValue, y: LanguageValue): boolean {
  return x == y;
}

/**
 * 7.2.14 IsStrictlyEqual ( x, y ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstrictlyequal
 */
export function IsStrictlyEqual(x: LanguageValue, y: LanguageValue): boolean {
  return x === y;
}
