/**
 * 6.1 ECMAScript Language Types https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types
 */

export {
  isNumber,
  Number_add,
  Number_bitwiseAND,
  Number_bitwiseNOT,
  Number_bitwiseOR,
  Number_bitwiseXOR,
  Number_divide,
  Number_equal,
  Number_exponentiate,
  Number_leftShift,
  Number_lessThan,
  Number_multiply,
  Number_remainder,
  Number_sameValue,
  Number_sameValueZero,
  Number_signedRightShift,
  Number_subtract,
  Number_toString,
  Number_unaryMinus,
  Number_unsignedRightShift,
  NumberBitwiseOp,
} from "./langtypes/numeric.ts";
export {
  isString,
  StringIndexOf,
  StringLastIndexOf,
} from "./langtypes/string.ts";

/**
 * 6.1 ECMAScript Language Types https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types
 *
 * > An ECMAScript language value is a value that is characterized by an ECMAScript language type.
 */
export type LanguageValue = unknown;

/**
 * 6.1 ECMAScript Language Types https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types
 *
 * > An ECMAScript language value is a value that is characterized by an ECMAScript language type.
 */
export type WrappedLanguageValue<T extends LanguageValue = LanguageValue> = {
  type: "LanguageValue";
  value: T;
};

/**
 * 6.1.1 The Undefined Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-undefined-type
 *
 * > The Undefined type has exactly one value, called undefined.
 *
 * @param value value to check
 * @returns true if value has a type of undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 6.1.2 The Null Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-null-type
 *
 * > The Null type has exactly one value, called null.
 *
 * @param value value to check
 * @returns true if value is the null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 6.1.3 The Boolean Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-boolean-type
 *
 * > The Boolean type represents a logical entity having two values, called true and false.
 *
 * @param value value to check
 * @returns true if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return typeof value === "boolean";
}

/**
 * 6.1.5 The Symbol Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-symbol-type
 *
 * > The Symbol type is the set of all non-String values that may be used as the key of an Object property.
 */
export function isSymbol(value: unknown): value is symbol {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return typeof value === "symbol";
}

/**
 * 6.1.6.2 The BigInt Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-bigint-type
 *
 * > The BigInt type represents an integer value.
 */
export function isBigInt(value: unknown): value is bigint {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return typeof value === "bigint";
}

/**
 * 6.1.7 The Object Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type
 *
 * > Each instance of the Object type, also referred to simply as “an Object”, represents a collection of properties.
 *
 * @param value value to check
 * @returns true if value is an object
 */
export function isObject(value: unknown): value is object {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return (typeof value === "object" || typeof value === "function") &&
    value !== null;
}

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
