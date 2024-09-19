import { isObject, type LanguageValue } from "./langtypes.ts";
import { Call, GetMethod, type StrictPropertyKey } from "./object.ts";

export type Primitive =
  | undefined
  | null
  | boolean
  | string
  | symbol
  | number
  | bigint;

/**
 * 7.1.1 ToPrimitive ( input [ , preferredType ] ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive
 */
export function ToPrimitive(
  input: LanguageValue,
  preferredType?: "STRING" | "NUMBER" | undefined,
): Primitive {
  if (isObject(input)) {
    const exoticToPrim = GetMethod(input, Symbol.toPrimitive);
    if (exoticToPrim != null) {
      const hint = preferredType === "STRING"
        ? "string"
        : preferredType === "NUMBER"
        ? "number"
        : "default";
      const result = Call(
        exoticToPrim as (this: unknown, hint: string) => unknown,
        input,
        [hint],
      );
      if (isObject(result)) {
        throw new TypeError("Cannot convert object to primitive value");
      } else {
        return result as Primitive;
      }
    } else {
      return OrdinaryToPrimitive(input, preferredType ?? "NUMBER");
    }
  } else {
    return input as Primitive;
  }
}

/**
 * 7.1.1.1 OrdinaryToPrimitive ( O, hint ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ordinarytoprimitive
 */
export function OrdinaryToPrimitive(
  o: object,
  hint: "STRING" | "NUMBER",
): Primitive {
  const methodNames: ("toString" | "valueOf")[] = hint === "STRING"
    ? ["toString", "valueOf"]
    : ["valueOf", "toString"];
  for (const name of methodNames) {
    const method = o[name];
    if (typeof method === "function") {
      const result = Call(method, o);
      if (!isObject(result)) {
        return result;
      }
    }
  }
  throw new TypeError("Cannot convert object to primitive value");
}

/**
 * 7.1.2 ToBoolean ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toboolean
 */
export function ToBoolean(argument: LanguageValue): boolean {
  // Use negation https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-logical-not-operator
  return !!argument;
}

/**
 * 7.1.3 ToNumeric ( value ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumeric
 */
export function ToNumeric(value: LanguageValue): number | bigint {
  // Use unary minus https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unary-minus-operator-runtime-semantics-evaluation
  // Note that, unary plus uses ToNumber instead, meaning +42n fails.
  // For both Number and BigInt, unary minus is involutive.
  // deno-lint-ignore no-explicit-any
  return -(-(value as any));
}

/**
 * 7.1.4 ToNumber ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumber
 */
export function ToNumber(argument: LanguageValue): number {
  // Use unary plus https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-unary-plus-operator-runtime-semantics-evaluation
  // deno-lint-ignore no-explicit-any
  return +(argument as any);
}

/**
 * 7.1.5 ToIntegerOrInfinity ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tointegerorinfinity
 *
 * The original abstract operation returns mathematical values.
 * We use number instead to represent them.
 */
export function ToIntegerOrInfinity(argument: LanguageValue): number {
  const number = ToNumber(argument);
  // or-ing 0 to remove minus zero and NaN
  return Math.trunc(number || 0);
}

/**
 * 7.1.6 ToInt32 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toint32
 */
export function ToInt32(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) | 0;
}

/**
 * 7.1.7 ToUint32 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-touint32
 */
export function ToUint32(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) << 0;
}

/**
 * 7.1.8 ToInt16 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toint16
 */
export function ToInt16(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) << 16 >> 16;
}

/**
 * 7.1.9 ToUint16 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-touint16
 */
export function ToUint16(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) << 16 >>> 16;
}

/**
 * 7.1.8 ToInt8 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toint8
 */
export function ToInt8(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) << 24 >> 24;
}

/**
 * 7.1.9 ToUint8 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-touint8
 */
export function ToUint8(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return (argument as any) << 24 >>> 24;
}

/**
 * 7.1.12 ToUint8Clamp ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-touint8clamp
 */
export function ToUint8Clamp(argument: LanguageValue): number {
  // deno-lint-ignore no-explicit-any
  return Math.max(0, Math.min(255, +(argument as any) || 0)) +
    4503599627370496 - 4503599627370496;
  // Alternatively we can store it to a Uint8ClampedArray and read it back
}

/**
 * 7.1.13 ToBigInt ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tobigint
 */
export function ToBigInt(argument: LanguageValue): bigint {
  // Unlike BigInt(), ToBigInt() must check for Number and throw an error.
  // To do that, one needs to explicitly resolve ToPrimitive first
  // without relying on existing APIs using ToPrimitive under the hood.
  const prim = ToPrimitive(argument, "NUMBER");
  if (typeof prim === "number") {
    throw new TypeError(`Cannot convert ${prim} to a BigInt`);
  }
  // Otherwise it's equivalent to BigInt() https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-constructor-number-value
  // deno-lint-ignore no-explicit-any
  return BigInt(prim as any);
}

/**
 * 7.1.14 StringToBigInt ( str ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-stringtobigint
 */
export function StringToBigInt(str: string): bigint {
  return BigInt(str);
}

/**
 * 7.1.15 ToBigInt64 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tobigint64
 */
export function ToBigInt64(argument: LanguageValue): bigint {
  // deno-lint-ignore no-explicit-any
  return BigInt.asIntN(64, argument as any);
}

/**
 * 7.1.16 ToBigUint64 ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tobiguint64
 */
export function ToBigUint64(argument: LanguageValue): bigint {
  // deno-lint-ignore no-explicit-any
  return BigInt.asUintN(64, argument as any);
}

/**
 * 7.1.17 ToString ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tostring
 */
export function ToString(argument: LanguageValue): string {
  return `${argument}`;
}

/**
 * 7.1.18 ToObject ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toobject
 */
export function ToObject(argument: LanguageValue): object {
  if (argument == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return Object(argument);
}

/**
 * 7.1.19 ToPropertyKey ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-topropertykey
 */
export function ToPropertyKey(argument: LanguageValue): StrictPropertyKey {
  const key = ToPrimitive(argument, "STRING");
  return typeof key === "symbol" ? key : `${key}`;
  // Alternatively we can Reflect.ownKeys({ [argument]: null })[0]
}

/**
 * 7.1.20 ToLength ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tolength
 */
export function ToLength(argument: LanguageValue): number {
  return Math.min(Math.max(ToIntegerOrInfinity(argument), 0), 2 ** 53 - 1);
}

/**
 * 7.1.21 CanonicalNumericIndexString ( argument ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tolength
 */
export function CanonicalNumericIndexString(
  argument: string,
): number | undefined {
  if (argument === "-0") {
    return -0;
  }
  const number = +argument;
  if (number && argument.length <= 4) {
    // Fast path (not important for correctness)
    // Handle cases for small enough integers except 0.
    // 0 is already fast for some reason (tested in V8)
    const len = argument.length;
    let i = 0;
    if (argument.charCodeAt(i) === 0x2D) {
      i++;
    }
    if (argument.charCodeAt(i) >= 0x31 && argument.charCodeAt(i) <= 0x39) {
      i++;
      while (true) {
        if (i < len) {
          const ch = argument.charCodeAt(i);
          if (ch >= 0x30 && ch <= 0x39) {
            i++;
          } else {
            break;
          }
        } else {
          return number;
        }
      }
    }
  }
  if (`${number}` === argument) {
    return number;
  }
  return undefined;
}

/**
 * 7.1.22 ToIndex ( value ) https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toindex
 *
 * @param message typical values are:
 *   - "Invalid value: not (convertible to) a safe integer" for general use
 *   - "Invalid typed array length" for TypedArray
 *   - "Invalid array buffer length" for ArrayBuffer and SharedArrayBuffer
 *   - "Invalid DataView length" for DataView
 */
export function ToIndex(
  value: LanguageValue,
  message: string = "Invalid value: not (convertible to) a safe integer",
): number {
  const integerIndex = ToIntegerOrInfinity(value);
  if (integerIndex < 0 || !Number.isSafeInteger(integerIndex)) {
    throw new RangeError(message);
  }
  return integerIndex;
}
