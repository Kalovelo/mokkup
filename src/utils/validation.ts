export const parseNumberInput = (val: string, min?: number, max?: number) => {
  const result = val ? parseInt(val.replace(/[a-z]/gi, "")) : 0;
  if (max && result > max) return max;
  if (min && result < min) return min;
  return result;
};
