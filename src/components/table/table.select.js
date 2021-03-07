import {$} from '@core/dom';
import {range} from '@core/utils';

export function selectCell(event, $root, selection) {
  if (event.target.dataset.type === 'cell') {
    let $cells = []
    const $eTarget = $(event.target)
    selection.select($eTarget)

    document.onmousemove = (e) => {
      const current = selection.current.id(true)
      const targetMove = $(e.path[0]).id(true)

      const cols = range(targetMove.col, current.col)
      const rows = range(targetMove.row, current.row)

      const ids = cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
      }, [])

      $cells = ids.map(id => $root.find(`[data-id="${id}"]`))
      selection.preSelectGroup($cells)
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $cells.length > 0 ?
        selection.selectGroup($cells) :
        selection.select($eTarget)
    }
  }
}
