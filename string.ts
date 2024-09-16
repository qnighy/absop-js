/**
 * 6.1.4.1 StringIndexOf ( string, searchValue, fromIndex ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringindexof
 */
export function stringIndexOf(
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
export function stringLastIndexOf(
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
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ispropertykey
 *
 * > A property key is either a String or a Symbol.
 */
export function isPropertyKey(value: unknown): value is string | symbol {
  return typeof value === "string" || typeof value === "symbol";
}

/**
 * https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#property-name
 *
 * > A property name is a property key that is a String.
 */
export function isPropertyName(value: unknown): value is string {
  return typeof value === "string";
}
