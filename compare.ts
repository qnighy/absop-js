/**
 * 7.2 Testing and Comparison Operations https://tc39.es/ecma262/multipage/abstract-operations.html#sec-testing-and-comparison-operations
 */

import { type LanguageValue } from "./langtypes.ts";

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
