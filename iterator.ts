export const GeneratorPrototype: Generator = Object.getPrototypeOf(function*(){}.prototype);
export const IteratorPrototype: IterableIterator<unknown> = Object.getPrototypeOf([][Symbol.iterator]());
export const AsyncGeneratorPrototype: AsyncGenerator = Object.getPrototypeOf(async function*(){}.prototype);
export const AsyncIteratorPrototype: AsyncIterableIterator<unknown> = Object.getPrototypeOf(AsyncGeneratorPrototype);

// function dummySuperclass<T>(prototype: T): new () => T {
//   return Object.assign(function () {} as unknown as new () => T, { prototype });
// }
// 
// // 27.1.4 Async-from-Sync Iterator Objects https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-from-sync-iterator-objects
// // These objects are never directly accessible to ECMAScript code,
// // thus merely reproducing the same behavior here.
// 
// class AsyncFromSyncIterator<T> extends dummySuperclass(AsyncIteratorPrototype) implements AsyncIterableIterator<T> {
//   #syncIterator: Iterator<T>;
//   constructor(syncIterator: Iterator<T>) {
//     super();
//     this.#syncIterator = syncIterator;
//   }
//   // deno-lint-ignore require-await
//   async next(...args: [] | [undefined]): Promise<IteratorResult<T>> {
//     return this.#syncIterator.next(...args);
//   }
//   async return?(...args: [] | [undefined | PromiseLike<undefined>]): Promise<IteratorResult<T>> {
//     const returner = this.#syncIterator.return;
//     if (returner !== null && typeof returner !== "function") {
//       throw new TypeError("");
//     }
//   }
//   async throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
// 
//   static {
//     Object.setPrototypeOf(this.prototype, AsyncIteratorPrototype);
//   }
// }
// 
// export const AsyncFromSyncIteratorPrototype: AsyncIterableIterator<unknown> = Object.assign(Object.create(AsyncIteratorPrototype), {
// });
