export const hashByCssVariable = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}
