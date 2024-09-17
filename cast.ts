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

export function toObject(argument: LanguageValue): object {
  if (argument == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return Object(argument);
}

export function toPropertyKey(argument: LanguageValue): StrictPropertyKey {
  const key = ToPrimitive(argument, "STRING");
  return typeof key === "symbol" ? key : `${key}`;
}
