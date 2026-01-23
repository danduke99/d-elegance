export function formatXCG(amount: number | string) {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "0.00 XCG";
  }

  return `${value.toFixed(2)} XCG`;
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}
