export function formatXCG(amount: number | string) {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "XCG 0.00";
  }

  return `XCG ${value.toFixed(2)}`;
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}
