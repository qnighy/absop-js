import { toObject, toPropertyKey } from "./cast.ts";
import { type LanguageValue, type WrappedLanguageValue } from "./langtypes.ts";
import { type StrictPropertyKey } from "./object.ts";
import { IsPropertyKey } from "./string.ts";

export type SpecValue = unknown;

/**
 * 6.2.4 The Completion Record Specification Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type
 *
 * > The Completion Record specification type is used to explain the runtime propagation of values and control flow such as the behaviour of statements (break, continue, return and throw) that perform nonlocal transfers of control.
 */
export type CompletionRecord<T extends SpecValue = SpecValue> = {
  type: "NORMAL" | "BREAK" | "CONTINUE" | "RETURN" | "THROW";
  value: T;
  target: WrappedLanguageValue<string> | "EMPTY";
};

// TODO: NormalCompletion
// TODO: ThrowCompletion
// TODO: UpdateEntry

/**
 * 6.2.5 The Reference Record Specification Type https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-reference-record-specification-type
 *
 * > The Reference Record type is used to explain the behaviour of such operators as delete, typeof, the assignment operators, the super keyword and other language features.
 */
export type ReferenceRecord =
  | PropertyReferenceRecord
  | EnvrionmentReferenceRecord
  | UnresolvableReferenceRecord;
export type PropertyReferenceRecord = {
  type: "ReferenceRecord";
  base: WrappedLanguageValue;
  referencedName: WrappedLanguageValue | PrivateName;
  strict: boolean;
  thisValue: WrappedLanguageValue | "EMPTY";
};
export type EnvrionmentReferenceRecord = {
  type: "ReferenceRecord";
  base: EnvironmentRecord;
  referencedName: WrappedLanguageValue<string>;
  strict: boolean;
  thisValue: "EMPTY";
};
export type UnresolvableReferenceRecord = {
  type: "ReferenceRecord";
  base: "UNRESOLVABLE";
  referencedName: WrappedLanguageValue | PrivateName;
  strict: boolean;
  thisValue: WrappedLanguageValue | "EMPTY";
};

/**
 * 6.2.5.1 IsPropertyReference ( V ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ispropertyreference
 */
export function IsPropertyReference(
  v: ReferenceRecord,
): v is PropertyReferenceRecord {
  return v.base !== "UNRESOLVABLE" && v.base.type === "LanguageValue";
}

/**
 * 6.2.5.2 IsUnresolvableReference ( V ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isunresolvablereference
 */
export function IsUnresolvableReference(
  v: ReferenceRecord,
): v is UnresolvableReferenceRecord {
  return v.base === "UNRESOLVABLE";
}

/**
 * 6.2.5.3 IsSuperReference ( V ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-issuperreference
 */
export function IsSuperReference(
  v: ReferenceRecord,
): v is ReferenceRecord & { thisValue: WrappedLanguageValue } {
  return v.thisValue !== "EMPTY";
}

/**
 * 6.2.5.4 IsPrivateReference ( V ) https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isprivatereference
 */
export function IsPrivateReference(
  v: ReferenceRecord,
): v is (PropertyReferenceRecord | UnresolvableReferenceRecord) & {
  referencedName: PrivateName;
} {
  return v.referencedName.type === "PrivateName";
}

/**
 * 6.2.5.5 GetValue ( V )
 */
export function GetValue(
  v: ReferenceRecord | WrappedLanguageValue,
): LanguageValue {
  if (v.type === "LanguageValue") {
    return v.value;
  }
  if (v.base === "UNRESOLVABLE") {
    throw new ReferenceError(`${v.referencedName} is not defined`);
  }
  if (v.base.type === "LanguageValue") {
    const baseObj = toObject(v.base.value);
    if (v.referencedName.type === "PrivateName") {
      throw new Error("TODO: PrivateName");
    }
    let referencedName = v.referencedName.value;
    if (!IsPropertyKey(referencedName)) {
      v.referencedName.value = referencedName = toPropertyKey(referencedName);
    }
    return Reflect.get(
      baseObj,
      referencedName as StrictPropertyKey,
      GetThisValue(v),
    );
  } else {
    throw new Error("TODO: BindingValue");
  }
}

export function GetThisValue(v: ReferenceRecord) {
  throw new Error("TODO: getThisValue");
}

export type EnvironmentRecord = {
  type: "EnvironmentRecord";
  // TODO
};
export type PrivateName = {
  type: "PrivateName";
  // TODO
};
