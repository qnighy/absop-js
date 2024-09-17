// Well-Known Intrinsic Objects https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-well-known-intrinsic-objects
// Only exporting ones without corresponding global name.

/**
 * 23.1.5.2 The %ArrayIteratorPrototype% Object https://tc39.es/ecma262/multipage/indexed-collections.html#sec-%arrayiteratorprototype%-object
 */
export const ArrayIteratorPrototype: IterableIterator<unknown> = Object
  .getPrototypeOf([][Symbol.iterator]());

// TODO: %ArrayIteratorPrototype%
// TODO: %AsyncFromSyncIteratorPrototype%
// TODO: %AsyncFunction%
// TODO: %AsyncGeneratorFunction%
// TODO: %AsyncGeneratorPrototype%
// TODO: %AsyncIteratorPrototype%
// TODO: %ForInIteratorPrototype%
// TODO: %GeneratorFunction%
// TODO: %GeneratorPrototype%
// TODO: %IteratorPrototype%
// TODO: %MapIteratorPrototype%
// TODO: %RegExpStringIteratorPrototype%
// TODO: %SetIteratorPrototype%
// TODO: %StringIteratorPrototype%
// TODO: %ThrowTypeError%
// TODO: %TypedArray%
