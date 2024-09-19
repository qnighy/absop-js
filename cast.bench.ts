import { CanonicalNumericIndexString } from "./cast.ts";

let cnt1 = 0, cnt2 = 0;
Deno.bench("CanonicalNumericIndexString 1", () => {
  const result = CanonicalNumericIndexString("5") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 2", () => {
  const result = CanonicalNumericIndexString("42") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 3", () => {
  const result = CanonicalNumericIndexString("325") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 4", () => {
  const result = CanonicalNumericIndexString("1234") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 5", () => {
  const result = CanonicalNumericIndexString("33333") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 6", () => {
  const result = CanonicalNumericIndexString("323256") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 7", () => {
  const result = CanonicalNumericIndexString("123456789") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 8", () => {
  const result = CanonicalNumericIndexString("0") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 9", () => {
  const result = CanonicalNumericIndexString("-1") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 10", () => {
  const result = CanonicalNumericIndexString("toString") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});

Deno.bench("CanonicalNumericIndexString 11", () => {
  const result = CanonicalNumericIndexString("sFyxEffig") !== undefined;
  cnt1 += Number(result);
  cnt2 += Number(!result);
});
