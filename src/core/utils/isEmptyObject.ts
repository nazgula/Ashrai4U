// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyObject = (obj: any): boolean => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }

  return true
}
