export function parse(value = '') {
  if (value.startsWith('=') && value.length > 1) {
    try {
      return String(eval(value.slice(1)))
    } catch (e) {
      console.warn(e.message)
    }
  }
  return value
}
