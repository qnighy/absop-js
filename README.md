# absop-js

This package contains equivalents of abstract operations as defined in ECMA-262 (ECMAScript spec).

## Why

When your library needs to imitate part of the language's or the standard library's behavior, you sometimes need to obtain the result of one of the abstract operations.

However, some of them are fairly complex and you are not sure how to implement them correctly.

This library is helpful if you are in such a situation.

## Policy

- Trivial implementation is allowed. For example, the `Object()` function's
  behavior is defined using `ToObject` abstract operation.
  In this case, this library attempts at using `Object()` function to
  reproduce the behavior of `ToObject` abstract operation.
- In principle, ECMAScript Language values are represented as-is.
  For example, ToObject(42𝔽), as defined in the spec, corresponds to `ToObject(42)` when using this library.
  However, if one needs to distinguish ECMAScript Language values from other Spec Values, the languages values may appear wrapped in a tagged object.
- In principle, Completions are represented as-is.
  For example, when the abstract operation is defined to return a throw completion, this library throws an exception.
  Similarly, normal completions and return completions are represented as a function return.
  If one needs to distinguish between normal and return completions or one needs to represent break or continue completions, this library man instead explicitly return a completion object.
- Mathematical values are represented as either Number or BigInt,
  depending on the context.
