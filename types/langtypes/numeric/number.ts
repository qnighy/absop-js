/**
 * 6.1.6.1 The Number Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type
 */

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
 * 6.1.6.1.1 Number::unaryMinus ( x ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unaryMinus
 */
export function Number_unaryMinus(x: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unary-minus-operator-runtime-semantics-evaluation
  return -x;
}

/**
 * 6.1.6.1.2 Number::bitwiseNOT ( x ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseNOT
 */
export function Number_bitwiseNOT(x: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-bitwise-not-operator-runtime-semantics-evaluation
  return ~x;
}

/**
 * 6.1.6.1.3 Number::exponentiate ( base, exponent ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-exponentiate
 */
export function Number_exponentiate(base: number, exponent: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-exp-operator-runtime-semantics-evaluation
  return base ** exponent;
}

/**
 * 6.1.6.1.4 Number::multiply ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-multiply
 */
export function Number_multiply(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return x * y;
}

/**
 * 6.1.6.1.5 Number::divide ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-divide
 */
export function Number_divide(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return x / y;
}

/**
 * 6.1.6.1.6 Number::remainder ( n, d ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-remainder
 */
export function Number_remainder(n: number, d: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return n % d;
}

/**
 * 6.1.6.1.7 Number::add ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-add
 */
export function Number_add(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-addition-operator-plus-runtime-semantics-evaluation
  return x + y;
}

/**
 * 6.1.6.1.8 Number::subtract ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-subtract
 */
export function Number_subtract(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-subtraction-operator-minus-runtime-semantics-evaluation
  return x - y;
}

/**
 * 6.1.6.1.9 Number::leftShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-leftShift
 */
export function Number_leftShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-left-shift-operator-runtime-semantics-evaluation
  return x << y;
}

/**
 * 6.1.6.1.10 Number::signedRightShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-signedRightShift
 */
export function Number_signedRightShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-signed-right-shift-operator-runtime-semantics-evaluation
  return x >> y;
}

/**
 * 6.1.6.1.11 Number::unsignedRightShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unsignedRightShift
 */
export function Number_unsignedRightShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unsigned-right-shift-operator-runtime-semantics-evaluation
  return x >>> y;
}

/**
 * 6.1.6.1.12 Number::lessThan ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-lessThan
 */
export function Number_lessThan(x: number, y: number): boolean {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-relational-operators-runtime-semantics-evaluation
  return x < y;
}

/**
 * 6.1.6.1.13 Number::equal ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-equal
 */
export function Number_equal(x: number, y: number): boolean {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-equality-operators-runtime-semantics-evaluation
  return x === y;
}

/**
 * 6.1.6.1.14 Number::sameValue ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-sameValue
 */
export function Number_sameValue(x: number, y: number): boolean {
  // Use Object.is https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is
  return Object.is(x, y);
}

/**
 * 6.1.6.1.15 Number::sameValueZero ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-sameValueZero
 */
export function Number_sameValueZero(x: number, y: number): boolean {
  return x === y || (Number.isNaN(x) && Number.isNaN(y));
}

/**
 * 6.1.6.1.16 NumberBitwiseOp ( op, x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numberbitwiseop
 */
export function NumberBitwiseOp(
  op: "&" | "^" | "|",
  x: number,
  y: number,
): number {
  // Use operators https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  switch (op) {
    case "&":
      return x & y;
    case "^":
      return x ^ y;
    case "|":
      return x | y;
  }
}

/**
 * 6.1.6.1.17 Number::bitwiseAND ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseAND
 */
export function Number_bitwiseAND(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x & y;
}

/**
 * 6.1.6.1.18 Number::bitwiseXOR ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseXOR
 */
export function Number_bitwiseXOR(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x ^ y;
}

/**
 * 6.1.6.1.19 Number::bitwiseOR ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseOR
 */
export function Number_bitwiseOR(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x | y;
}

/**
 * 6.1.6.1.20 Number::toString ( x, radix ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring
 */
export function Number_toString(x: number, radix: number): string {
  // Use Number.prototype.toString https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-number.prototype.tostring
  // We assume radix is an integer between 2 and 36 (inclusive)
  return x.toString(radix);
}

// TODO: integer index https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#integer-index

// TODO: array index https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#array-index
