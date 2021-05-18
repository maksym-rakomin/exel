import {$} from '@core/dom';
import {range} from '@core/utils';

export function selectCell(event, el) {
  if (event.target.dataset.type === 'cell') {
    let $cells = []
    const $eTarget = $(event.target)
    el.selection.select($eTarget)
    console.log(555, $eTarget)

    document.onmousemove = (e) => {
      const current = el.selection.current.id(true)
      const targetMove = $(e.path[0]).id(true)

      const cols = range(targetMove.col, current.col)
      const rows = range(targetMove.row, current.row)

      const ids = cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
      }, [])

      $cells = ids.map(id => el.$root.find(`[data-id="${id}"]`))
      el.selection.preSelectGroup($cells)
      console.log(66666, $cells)
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if ($cells.length > 1) {
        el.selection.selectGroup($cells)
      } else {
        el.selection.select($eTarget)
        el.$emit('table:selection', $eTarget)
      }
    }
  }
}
