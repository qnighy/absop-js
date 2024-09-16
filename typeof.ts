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
  return typeof value === "object" && value !== null;
}
