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
