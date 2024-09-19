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
 * 6.1.4 The String Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-string-type
 *
 * > The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2**53 - 1 elements.
 *
 * @param value value to check
 * @returns true if value is a string
 */
export function isString(value: unknown): value is string {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return typeof value === "string";
}

/**
 * 6.1.4.1 StringIndexOf ( string, searchValue, fromIndex ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringindexof
 */
export function StringIndexOf(
  string: string,
  searchValue: string,
  fromIndex: number,
): number | "NOT-FOUND" {
  // Use String.prototype.indexOf https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.indexof
  if (fromIndex > string.length) {
    // StringIndexOf("a", "", 2) is NOT-FOUND while "a".indexOf("", 2) is 1
    // Note that, we assume fromIndex to be a nonnegative integer, so we don't check for values outside of this range
    return "NOT-FOUND";
  }
  const idx = string.indexOf(searchValue, fromIndex);
  return idx === -1 ? "NOT-FOUND" : idx;
}

/**
 * 6.1.4.2 StringLastIndexOf ( string, searchValue, fromIndex ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringlastindexof
 */
export function StringLastIndexOf(
  string: string,
  searchValue: string,
  fromIndex: number,
): number | "NOT-FOUND" {
  // Use String.prototype.lastIndexOf https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.lastindexof
  // There is an Assert check in the spec to ensure fromIndex is already clamped to an appropriate range.
  // So we do not insert range check here for now.
  const idx = string.lastIndexOf(searchValue, fromIndex);
  return idx === -1 ? "NOT-FOUND" : idx;
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
 * 6.1.6.1 The Number Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type
 *
 * > The Number type has exactly 18,437,736,874,454,810,627 (that is, 2**64 - 2**53 + 3) values,
 * > representing the double-precision floating point IEEE 754-2019 binary64 values as specified
 * > in the IEEE Standard for Binary Floating-Point Arithmetic, except that
 * > the 9,007,199,254,740,990 (that is, 2**53 - 2) distinct “Not-a-Number” values
 * > of the IEEE Standard are represented in ECMAScript as a single special NaN value.
 */
export function isNumber(value: unknown): value is number {
  // Use typeof https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator-runtime-semantics-evaluation
  return typeof value === "number";
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
