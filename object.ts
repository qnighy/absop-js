import { type LanguageValue } from "./langtypes.ts";

/**
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ispropertykey
 *
 * > A property key is either a String or a Symbol.
 *
 * To distinguish from TypeScript's PropertyKey, it is deliberately
 * named StrictPropertyKey.
 */
export type StrictPropertyKey = string | symbol;

/**
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ispropertykey
 *
 * > A property key is either a String or a Symbol.
 */
export function isPropertyKey(value: unknown): value is StrictPropertyKey {
  return typeof value === "string" || typeof value === "symbol";
}

/**
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#property-name
 *
 * > A property name is a property key that is a String.
 */
export type PropertyName = string;

/**
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#property-name
 *
 * > A property name is a property key that is a String.
 */
export function isPropertyName(value: unknown): value is string {
  return typeof value === "string";
}

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
