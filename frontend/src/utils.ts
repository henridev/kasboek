export const genKey = (s: string): string =>
  s?.toLowerCase().replace(/\s/g, "_").replace(/\./g, "");

export const convertToIsoString = (s: string): string =>`${s}T00:00:00Z`

export const convertToIsoStringTwo = (s: string): string =>{
  const datum = s.split("/")
  return `${datum[2]}-${datum[1]}-${datum[0]}T00:00:00Z`    
}

