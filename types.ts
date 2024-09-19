/**
 * 6 ECMAScript Data Types and Values https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values
 */

export {
  isBigInt,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isPropertyKey,
  isPropertyName,
  isString,
  isSymbol,
  isUndefined,
  type LanguageValue,
  type PropertyName,
  type StrictPropertyKey,
  StringIndexOf,
  StringLastIndexOf,
  type WrappedLanguageValue,
} from "./types/langtypes.ts";
export {
  type CompletionRecord,
  type EnvironmentRecord,
  type EnvrionmentReferenceRecord,
  GetThisValue,
  GetValue,
  IsPrivateReference,
  IsPropertyReference,
  IsSuperReference,
  IsUnresolvableReference,
  type PrivateName,
  type PropertyReferenceRecord,
  type ReferenceRecord,
  type SpecValue,
  type UnresolvableReferenceRecord,
} from "./types/spectypes.ts";
