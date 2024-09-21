/**
 * 7.3 Operations on Objects https://tc39.es/ecma262/multipage/abstract-operations.html#sec-operations-on-objects
 */

import type { LanguageValue, StrictPropertyKey } from "../types.ts";
import type { ObjectRecord } from "../utils.ts";

/**
 * 7.3.2 Get ( O, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-get-o-p
 */
export function Get(o: object, p: StrictPropertyKey): LanguageValue {
  return (o as ObjectRecord)[p];
}

/**
 * 7.3.3 GetV ( V, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getv
 */
export function GetV(v: LanguageValue, p: StrictPropertyKey): LanguageValue {
  return (v as ObjectRecord)[p];
}

/**
 * 7.3.4 Set ( O, P, V, Throw ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-set-o-p-v-throw
 */
export function Set(
  o: object,
  p: StrictPropertyKey,
  v: LanguageValue,
  throw_: boolean,
): void {
  if (throw_) {
    // Note that, as we are in a module, this statement runs in strict mode.
    (o as ObjectRecord)[p] = v;
  } else {
    Reflect.set(o, p, v, o);
  }
}

export function GetMethod(
  v: LanguageValue,
  p: StrictPropertyKey,
): ((...args: unknown[]) => unknown) | undefined {
  const func = (v as ObjectRecord)[p] as unknown;
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
  argumentsList: A = [] as unknown as A,
): R {
  return Function.prototype.apply.call(f, v, argumentsList);
}
