export function dummyConstructor<T>(prototype: T): new () => T {
  return Object.assign(function () {} as unknown as new () => T, { prototype });
}
