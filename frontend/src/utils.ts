export const genKey = (s: string): string =>
  s?.toLowerCase().replace(/\s/g, "_").replace(/\./g, "");
