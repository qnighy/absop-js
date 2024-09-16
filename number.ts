/**
 * 6.1.6.1.1 Number::unaryMinus ( x ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unaryMinus
 */
export function numberUnaryMinus(x: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unary-minus-operator-runtime-semantics-evaluation
  return -x;
}

/**
 * 6.1.6.1.2 Number::bitwiseNOT ( x ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseNOT
 */
export function numberBitwiseNOT(x: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-bitwise-not-operator-runtime-semantics-evaluation
  return ~x;
}

/**
 * 6.1.6.1.3 Number::exponentiate ( base, exponent ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-exponentiate
 */
export function numberExponentiate(base: number, exponent: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-exp-operator-runtime-semantics-evaluation
  return base ** exponent;
}

/**
 * 6.1.6.1.4 Number::multiply ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-multiply
 */
export function numberMultiply(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return x * y;
}

/**
 * 6.1.6.1.5 Number::divide ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-divide
 */
export function numberDivide(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return x / y;
}

/**
 * 6.1.6.1.6 Number::remainder ( n, d ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-remainder
 */
export function numberRemainder(n: number, d: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators-runtime-semantics-evaluation
  return n % d;
}

/**
 * 6.1.6.1.7 Number::add ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-add
 */
export function numberAdd(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-addition-operator-plus-runtime-semantics-evaluation
  return x + y;
}

/**
 * 6.1.6.1.8 Number::subtract ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-subtract
 */
export function numberSubtract(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-subtraction-operator-minus-runtime-semantics-evaluation
  return x - y;
}

/**
 * 6.1.6.1.9 Number::leftShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-leftShift
 */
export function numberLeftShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-left-shift-operator-runtime-semantics-evaluation
  return x << y;
}

/**
 * 6.1.6.1.10 Number::signedRightShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-signedRightShift
 */
export function numberSignedRightShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-signed-right-shift-operator-runtime-semantics-evaluation
  return x >> y;
}

/**
 * 6.1.6.1.11 Number::unsignedRightShift ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-unsignedRightShift
 */
export function numberUnsignedRightShift(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unsigned-right-shift-operator-runtime-semantics-evaluation
  return x >>> y;
}

/**
 * 6.1.6.1.12 Number::lessThan ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-lessThan
 */
export function numberLessThan(x: number, y: number): boolean {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-relational-operators-runtime-semantics-evaluation
  return x < y;
}

/**
 * 6.1.6.1.13 Number::equal ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-equal
 */
export function numberEqual(x: number, y: number): boolean {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-equality-operators-runtime-semantics-evaluation
  return x === y;
}

/**
 * 6.1.6.1.14 Number::sameValue ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-sameValue
 */
export function numberSameValue(x: number, y: number): boolean {
  // Use Object.is https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is
  return Object.is(x, y);
}

/**
 * 6.1.6.1.15 Number::sameValueZero ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-sameValueZero
 */
export function numberSameValueZero(x: number, y: number): boolean {
  return x === y || (Number.isNaN(x) && Number.isNaN(y));
}

/**
 * 6.1.6.1.16 NumberBitwiseOp ( op, x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numberbitwiseop
 */
export function numberBitwiseOp(
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
export function numberBitwiseAND(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x & y;
}

/**
 * 6.1.6.1.18 Number::bitwiseXOR ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseXOR
 */
export function numberBitwiseXOR(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x ^ y;
}

/**
 * 6.1.6.1.19 Number::bitwiseOR ( x, y ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-bitwiseOR
 */
export function numberBitwiseOR(x: number, y: number): number {
  // Use operator https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators-runtime-semantics-evaluation
  return x | y;
}

/**
 * 6.1.6.1.20 Number::toString ( x, radix ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring
 */
export function numberToString(x: number, radix: number): string {
  // Use Number.prototype.toString https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-number.prototype.tostring
  // We assume radix is an integer between 2 and 36 (inclusive)
  return x.toString(radix);
}

// TODO: integer index https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#integer-index

// TODO: array index https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#array-index
