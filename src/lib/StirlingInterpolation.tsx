export function forwardDifferences(y: number[]): number[][] {
  const n = y.length;
  const diff: number[][] = [];
  diff.push(y);
  for (let i = 1; i < n; i++) {
    const levelDiff: number[] = [];
    for (let j = 0; j < n - i; j++) {
      levelDiff.push(diff[i - 1][j + 1] - diff[i - 1][j]);
    }
    diff.push(levelDiff);
  }
  return diff;
}

export function stirlingInterpolation(
 x: number[],
 y: number[],
 X: number
): number {
 const n = x.length;
 if (n < 3) throw new Error("Minimal 3 titik data untuk interpolasi Stirling");
 const h = x[1] - x[0];
 const mid = Math.floor(n / 2);
 const p = (X - x[mid]) / h;

 const diff = forwardDifferences(y);

 let result = y[mid];
 let pProduct = 1;
 let factorial = 1;

 for (let i = 1; i < n; i++) {
   factorial *= i;
   if (i % 2 !== 0) {
     pProduct *= p - (i - 1) / 2;
     result += (pProduct * (diff[i][mid - Math.floor(i / 2)] + diff[i][mid - Math.floor(i / 2) - 1]) / 2) / factorial;
   } else {
     pProduct *= p + (i / 2) - 1;
     result += (pProduct * diff[i][mid - (i / 2)]) / factorial;
   }
 }

 return result;
}
