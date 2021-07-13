export const parseNumberInput = (val: string, { min, max }: { min?: number; max?: number } = {}) => {
  const result = val ? parseInt(val.replace(/[^0-9]/g, "")) : 0;
  if (max && result > max) return max;
  if (min && result < min) return min;
  return result;
};
