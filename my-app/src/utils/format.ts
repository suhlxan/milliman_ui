// utils/format.ts
export const capitalizeFirstLetter = (value: string) =>
  value.replace(/\b\w/g, (char) => char.toUpperCase());
