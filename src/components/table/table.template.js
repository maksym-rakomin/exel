const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `<div class="cell" contenteditable></div>`
}

function toColumn(col) {
  return `<div class ="column">${col}</div>`
}

function createRow(content, index = '') {
  return `<div class="row">
            <div class="row-info">${index !== '' ? index + 1 : ''}</div>
            <div class="row-data">${content }</div> 
          </div>`
}

function toChar(el, index) {
  return String.fromCharCode( CODES.A + index)
}

export function createTable(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const emptyCols = new Array(colsCount)
      .fill(createCell())
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(emptyCols, i))
  }
  return rows.join('')
}
