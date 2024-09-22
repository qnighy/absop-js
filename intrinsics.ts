// 6.1.7.4 Well-Known Intrinsic Objects https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-well-known-intrinsic-objects

export const $ArrayIteratorPrototype$: IterableIterator<unknown> = Object
  .getPrototypeOf([][Symbol.iterator]());

export const $AsyncFunction$: FunctionConstructor = async function () {}
  .constructor as FunctionConstructor;

export const $AsyncGeneratorFunction$: FunctionConstructor =
  async function* () {}
    .constructor as FunctionConstructor;

export const $AsyncGeneratorPrototype$: AsyncGenerator<unknown> = Object
  .getPrototypeOf((async function* () {}).prototype);

export const $AsyncIteratorPrototype$: AsyncIterableIterator<unknown> = Object
  .getPrototypeOf($AsyncGeneratorPrototype$);

export const $GeneratorFunction$: FunctionConstructor = function* () {}
  .constructor as FunctionConstructor;

export const $GeneratorPrototype$: Generator<unknown> = Object
  .getPrototypeOf((function* () {}).prototype);

export const $IteratorPrototype$: IterableIterator<unknown> = Object
  .getPrototypeOf($GeneratorPrototype$);

export const $MapIteratorPrototype$: IterableIterator<unknown> = Object
  .getPrototypeOf(new Map()[Symbol.iterator]());

export const $RegExpStringIteratorPrototype$: IterableIterator<unknown> = Object
  .getPrototypeOf(/(?:)/[Symbol.matchAll](""));

export const $SetIteratorPrototype$: IterableIterator<unknown> = Object
  .getPrototypeOf(new Set()[Symbol.iterator]());

export const $ThrowTypeError$: () => never = Object.getOwnPropertyDescriptor(
  Function.prototype,
  "arguments",
)!.get! as () => never;

// deno-lint-ignore ban-types
export const $TypedArray$: Function =
  Object.getPrototypeOf(Uint8Array.prototype).constructor;
