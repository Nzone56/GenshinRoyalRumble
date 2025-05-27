export const roundNumber = (value: number, decimals = 2): number =>
  Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
