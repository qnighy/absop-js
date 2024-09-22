/**
 * 7.3 Operations on Objects https://tc39.es/ecma262/multipage/abstract-operations.html#sec-operations-on-objects
 */

import type {
  Constructor,
  LanguageValue,
  StrictPropertyKey,
} from "../types.ts";
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

/**
 * 7.3.5 CreateDataProperty ( O, P, V ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createdataproperty
 */
export function CreateDataProperty(
  o: object,
  p: StrictPropertyKey,
  v: LanguageValue,
): boolean {
  return Reflect.defineProperty(o, p, {
    value: v,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

/**
 * 7.3.6 CreateDataPropertyOrThrow ( O, P, V ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createdatapropertyorthrow
 */
export function CreateDataPropertyOrThrow(
  o: object,
  p: StrictPropertyKey,
  v: LanguageValue,
): void {
  Object.defineProperty(o, p, {
    value: v,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

/**
 * 7.3.7 CreateNonEnumerableDataPropertyOrThrow ( O, P, V ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createnonenumerabledatapropertyorthrow
 */
export function CreateNonEnumerableDataPropertyOrThrow(
  o: object,
  p: StrictPropertyKey,
  v: LanguageValue,
): void {
  Object.defineProperty(o, p, {
    value: v,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/**
 * 7.3.8 DefinePropertyOrThrow ( O, P, desc ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-definepropertyorthrow
 */
export function DefinePropertyOrThrow(
  o: object,
  p: StrictPropertyKey,
  desc: PropertyDescriptor,
): void {
  Object.defineProperty(o, p, desc);
}

/**
 * 7.3.9 DeletePropertyOrThrow ( O, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-deletepropertyorthrow
 */
export function DeletePropertyOrThrow(o: object, p: StrictPropertyKey): void {
  // Note that we are in a strict mode.
  delete (o as ObjectRecord)[p];
}

/**
 * 7.3.10 GetMethod ( V, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-deletepropertyorthrow
 */
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

/**
 * 7.3.11 HasProperty ( O, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-hasproperty
 */
export function HasProperty(o: object, p: StrictPropertyKey): boolean {
  return p in o;
}

/**
 * 7.3.12 HasOwnProperty ( O, P ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-hasownproperty
 */
export function HasOwnProperty(o: object, p: StrictPropertyKey): boolean {
  return Object.hasOwn(o, p);
}

/**
 * 7.3.13 Call ( F, V [ , argumentsList ] ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-call
 */
export function Call(
  f: LanguageValue,
  v: LanguageValue,
  argumentsList: LanguageValue[] = [],
): LanguageValue {
  return Reflect.apply(f as (...args: unknown[]) => unknown, v, argumentsList);
}

/**
 * 7.3.14 Construct ( F [ , argumentsList [ , newTarget ] ] ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-call
 */
export function Construct(
  f: Constructor,
  argumentsList: LanguageValue[] = [],
  newTarget?: Constructor,
): object {
  return Reflect.construct(f, argumentsList, newTarget);
}
