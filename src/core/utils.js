export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row > 0 ? row-- : row
      break
    case 'ArrowLeft':
      col > 0 ? col-- : col
      break
  }
  return `[data-id="${row}:${col}"]`
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(firstObj, secondObj) {
  if (typeof firstObj === 'object' && typeof secondObj === 'object') {
    return JSON.stringify(firstObj) === JSON.stringify(secondObj )
  }
  return firstObj === secondObj
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}
