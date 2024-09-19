/**
 * 7.3 Operations on Objects https://tc39.es/ecma262/multipage/abstract-operations.html#sec-operations-on-objects
 */

import { type LanguageValue, type StrictPropertyKey } from "../types.ts";

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
