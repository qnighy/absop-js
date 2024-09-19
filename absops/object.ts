/**
 * 7.3 Operations on Objects https://tc39.es/ecma262/multipage/abstract-operations.html#sec-operations-on-objects
 */

import {
  isObject,
  type LanguageValue,
  type StrictPropertyKey,
} from "../types.ts";

export function Get(o: object, p: StrictPropertyKey): LanguageValue {
  // deno-lint-ignore no-explicit-any
  return (o as any)[p];
}

export function GetV(v: LanguageValue, p: StrictPropertyKey): LanguageValue {
  // deno-lint-ignore no-explicit-any
  return (v as any)[p];
}

export function GetMethod(
  v: LanguageValue,
  p: StrictPropertyKey,
): ((...args: unknown[]) => unknown) | undefined {
  // deno-lint-ignore no-explicit-any
  const func = (v as any)[p] as unknown;
  if (func == null) {
    return undefined;
  }
  if (typeof func !== "function") {
    if (
      typeof func === "number" || typeof func === "string" ||
      typeof func === "boolean"
    ) {
      throw new TypeError(`${typeof func} ${func} is not callable`);
    } else {
      throw new TypeError(`${typeof func} is not callable`);
    }
  }
  return func as ((...args: unknown[]) => unknown);
}

// deno-lint-ignore no-explicit-any
export function Call<T, A extends any[], R>(
  f: (this: T, ...args: A) => R,
  v: T,
  argumentsList: A,
): R;
export function Call<T, R>(f: (this: T, ...args: []) => R, v: T): R;
// deno-lint-ignore no-explicit-any
export function Call<T, A extends any[], R>(
  f: (this: T, ...args: A) => R,
  v: T,
  // deno-lint-ignore no-explicit-any
  argumentsList: A = [] as any,
): R {
  return Function.prototype.apply.call(f, v, argumentsList);
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
  // deno-lint-ignore no-explicit-any
  const matcher = (argument as any)[Symbol.match];
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
      // deno-lint-ignore no-explicit-any
    } as any);
  } catch (e) {
    if (!(e instanceof TypeError)) {
      throw e;
    }
  }
  return hasSlot;
}
